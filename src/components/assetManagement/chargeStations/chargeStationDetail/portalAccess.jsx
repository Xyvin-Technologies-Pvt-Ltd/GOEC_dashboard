import React, { useState } from "react";
import { Box, CircularProgress, Modal, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import StyledButton from "../../../../ui/styledButton";
import StyledDivider from "../../../../ui/styledDivider";
import StyledStatusChip from "../../../../ui/styledStatusChip";
import ConfirmDialog from "../../../../ui/confirmDialog";
import { ReactComponent as Close } from "../../../../assets/icons/close-circle.svg";
import PortalUserForm from "./portalUserForm";
import { useStationPortalUser } from "../../../../hooks/queries/useStationUser";
import {
  useCreateStationPortalUser,
  useUpdateStationPortalUser,
  useResetStationPortalUserPassword,
  useDeleteStationPortalUser,
} from "../../../../hooks/mutations/useStationUserMutation";
import { useAuthStore } from "../../../../store";
import { permissions } from "../../../../core/routes/permissions";

const PORTAL_URL = process.env.REACT_APP_STATION_PORTAL_URL || "https://foco.goecm.com.np";

const apiError = (error, fallback) => error?.response?.data?.error || fallback;

const warnIfEmailFailed = (res) => {
  if (res?.emailSent === false) {
    toast.warn("The email could not be sent. Use \"Reset password\" to send new credentials.");
  }
};

const dimText = { color: "primary.DimText", fontSize: "12px", fontWeight: "400" };

// Station reports portal (foco) access for one station: at most one portal user.
export default function PortalAccess({ station }) {
  const hasPermission = useAuthStore((state) => state.hasPermission);
  const canView = hasPermission(permissions.adminManagement.view);
  const canModify = hasPermission(permissions.adminManagement.modify);

  const [formOpen, setFormOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const { data: portalUser, isLoading, isError, error } = useStationPortalUser(station._id, canView);

  const closeForm = () => setFormOpen(false);

  const createMutation = useCreateStationPortalUser({
    onSuccess: (res) => {
      toast.success("Portal user created and credentials emailed");
      warnIfEmailFailed(res);
      closeForm();
    },
    onError: (err) => toast.error(apiError(err, "Failed to create portal user")),
  });
  const updateMutation = useUpdateStationPortalUser({
    onSuccess: () => {
      toast.success("Portal user updated");
      closeForm();
    },
    onError: (err) => toast.error(apiError(err, "Failed to update portal user")),
  });
  const resetMutation = useResetStationPortalUserPassword({
    onSuccess: (res) => {
      toast.success("Password reset and new credentials emailed");
      warnIfEmailFailed(res);
    },
    onError: (err) => toast.error(apiError(err, "Failed to reset password")),
  });
  const deleteMutation = useDeleteStationPortalUser({
    onSuccess: () => toast.success("Portal user removed"),
    onError: (err) => toast.error(apiError(err, "Failed to remove portal user")),
  });

  if (!canView) return null;

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isBusy = isSaving || resetMutation.isPending || deleteMutation.isPending;

  const handleFormSubmit = (data) => {
    if (portalUser) {
      updateMutation.mutate({ id: portalUser._id, data });
    } else {
      createMutation.mutate({ ...data, station: station._id });
    }
  };

  const confirmConfig = portalUser && {
    reset: {
      title: "Reset portal password",
      subtitle: `A new temporary password will be emailed to ${portalUser.email}. Any open portal session will be signed out.`,
      buttonText: "Reset",
      run: () => resetMutation.mutate(portalUser._id),
    },
    toggle: {
      title: portalUser.isActive ? "Deactivate portal access" : "Activate portal access",
      subtitle: portalUser.isActive
        ? `${portalUser.name} will be signed out and will not be able to sign in to the station portal.`
        : `${portalUser.name} will be able to sign in to the station portal again.`,
      buttonText: portalUser.isActive ? "Deactivate" : "Activate",
      run: () => updateMutation.mutate({ id: portalUser._id, data: { isActive: !portalUser.isActive } }),
    },
    delete: {
      title: "Remove portal user",
      subtitle: `${portalUser.email} will be deleted and can no longer sign in. You can create a new portal user for this station afterwards.`,
      buttonText: "Remove",
      run: () => deleteMutation.mutate(portalUser._id),
    },
  }[confirmAction];

  const formDefaults = portalUser
    ? { name: portalUser.name, email: portalUser.email, mobile: portalUser.mobile || "" }
    : { name: station.owner || "", email: station.owner_email || "", mobile: station.owner_phone || "" };

  const renderBody = () => {
    if (isLoading) {
      return (
        <Stack alignItems="center" sx={{ py: 3 }}>
          <CircularProgress size={24} />
        </Stack>
      );
    }
    if (isError) {
      return (
        <Typography sx={{ ...dimText, py: 2 }}>
          {apiError(error, "Could not load portal access for this station")}
        </Typography>
      );
    }
    if (!portalUser) {
      return (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }} justifyContent="space-between" sx={{ py: 1 }}>
          <Typography sx={dimText}>
            No portal user yet. Create one so the station can view its charging, transaction and finance reports.
          </Typography>
          {canModify && (
            <StyledButton variant="primary" width="170" height="40" fontSize="14" p="8" style={{ flexShrink: 0 }} onClick={() => setFormOpen(true)}>
              Create portal user
            </StyledButton>
          )}
        </Stack>
      );
    }

    return (
      <Stack spacing={2}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1}>
          <Stack spacing="5px">
            <Typography variant="h6" fontSize={18}>{portalUser.name}</Typography>
            <Typography sx={dimText}>{portalUser.email}</Typography>
            {portalUser.mobile && <Typography sx={dimText}>Ph No : {portalUser.mobile}</Typography>}
          </Stack>
          <Stack direction="row" spacing={1} alignItems="flex-start" flexWrap="wrap" useFlexGap>
            <StyledStatusChip $status={portalUser.status}>{portalUser.status}</StyledStatusChip>
            {portalUser.isLocked && <StyledStatusChip $status="OFFLINE">Locked</StyledStatusChip>}
            {portalUser.mustChangePassword && <StyledStatusChip $status="PENDING">Password pending</StyledStatusChip>}
          </Stack>
        </Stack>
        <Typography sx={dimText}>
          Last sign-in: {portalUser.lastLoginAt ? dayjs(portalUser.lastLoginAt).format("DD MMM YYYY, hh:mm A") : "Never"}
          {portalUser.isLocked && " · Locked after repeated failed sign-ins (resetting the password unlocks it)"}
        </Typography>
        {canModify && (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <StyledButton variant="secondary" width="90" height="36" fontSize="13" p="6" disabled={isBusy} onClick={() => setFormOpen(true)}>
              Edit
            </StyledButton>
            <StyledButton variant="secondary" width="140" height="36" fontSize="13" p="6" disabled={isBusy} onClick={() => setConfirmAction("reset")}>
              Reset password
            </StyledButton>
            <StyledButton variant="secondary" width="110" height="36" fontSize="13" p="6" disabled={isBusy} onClick={() => setConfirmAction("toggle")}>
              {portalUser.isActive ? "Deactivate" : "Activate"}
            </StyledButton>
            <StyledButton variant="secondary" width="90" height="36" fontSize="13" p="6" disabled={isBusy} onClick={() => setConfirmAction("delete")}>
              Remove
            </StyledButton>
          </Stack>
        )}
      </Stack>
    );
  };

  return (
    <Box sx={{ px: { xs: 1, md: 5 }, py: 3, backgroundColor: "secondary.main", borderRadius: "4px" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="caption" sx={{ color: "primary.DimText", fontSize: "14px", fontWeight: "400" }}>
          Station Portal Access
        </Typography>
        <Typography
          component="a"
          href={PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ ...dimText, textDecoration: "underline" }}
        >
          {PORTAL_URL.replace(/^https?:\/\//, "")}
        </Typography>
      </Stack>
      <Box sx={{ border: "1px solid rgba(255, 255, 255, 0.20)", borderRadius: "4px", p: 2 }}>{renderBody()}</Box>

      {confirmConfig && (
        <ConfirmDialog
          open
          title={confirmConfig.title}
          subtitle={confirmConfig.subtitle}
          buttonText={confirmConfig.buttonText}
          onClose={() => setConfirmAction(null)}
          confirmButtonHandle={confirmConfig.run}
        />
      )}

      <Modal open={formOpen} onClose={closeForm}>
        <Box sx={modalStyle}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} my={2}>
            <Typography sx={{ color: "secondary.greytext", fontSize: 18, fontWeight: 700 }}>
              {portalUser ? "Edit Portal User" : "Create Portal User"}
            </Typography>
            <Close onClick={closeForm} style={{ cursor: "pointer" }} />
          </Stack>
          <StyledDivider />
          <PortalUserForm
            key={portalUser?._id || "new"}
            defaultValues={formDefaults}
            isEdit={!!portalUser}
            isSaving={isSaving}
            onSubmit={handleFormSubmit}
            onClose={closeForm}
          />
        </Box>
      </Modal>
    </Box>
  );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "#27292F",
  boxShadow: 10,
  p: 4,
  color: "#fff",
  outline: "none",
};
