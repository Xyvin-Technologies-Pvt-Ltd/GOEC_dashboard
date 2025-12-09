import React from "react";
import LastSynced from "../../../layout/LastSynced";
import { Box, Dialog, Modal, Stack, Typography } from "@mui/material";
import StyledTable from "../../../ui/styledTable";
import StyledButton from "../../../ui/styledButton";
import { useState } from "react";
import StyledDivider from "../../../ui/styledDivider";
import AddRole from "./addRole";
import { ReactComponent as Close } from "../../../assets/icons/close-circle.svg";
import { toast } from "react-toastify";
import { useDeleteRole } from "../../../hooks/mutations/useUserMutation";
import { Transition } from "../../../utils/DialogAnimation";
import { useAuthStore } from "../../../store";
import { permissions } from "../../../core/routes/permissions";

export default function RoleManagement({ headers, data, setIsChange, isChange, setPageNo, totalCount }) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("add");
  const [tableData, setTableData] = useState();
  const hasPermission = useAuthStore((state) => state.hasPermission)
  // Function to open the modal
  const handleOpen = () => {
    setTableData();
    setAction("add");
    setOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
  };
  const handleRoleSuccess = () => {
    toast.success("Role successfully updated!");
    handleClose(); // Close the modal after success
  };
  const deleteRoleMutation = useDeleteRole({
    onSuccess: () => {
      setIsChange(!isChange);
      toast.success("Role deleted!");
    },
    onError: () => {
      toast.error("Failed to delete role!");
    },
  });

  const handleClick = (e) => {
    if (e.action === "Edit") {
      setAction("edit");
      setOpen(true);
      setTableData(e.data);
    } else if (e.action === "Delete") {
      deleteRoleMutation.mutate(e.data._id);
    }
  };
  return (
    <>
      <LastSynced heading="Role Management" showSearchField={true} />
      <Box sx={{ p: 3 }}>
        <Box display="flex" justifyContent="flex-end">
          <StyledButton variant="secondary" width="150" mr="10" onClick={handleOpen}>
            Add
          </StyledButton>
        </Box>
        <StyledTable headers={headers} 
        data={data}
        setPageNo={setPageNo}
        totalCount={totalCount}
        onActionClick={handleClick} 
        showActionCell={hasPermission(permissions.roleManagement.modify)}
        actions={["Edit","Delete"]} />
      </Box>
      {/* Modal */} 
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box sx={modalStyle}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            my={2}
          >
            <Typography
              sx={{
                color: "secondary.greytext",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Add New Admin
            </Typography>
            <Close onClick={handleClose} style={{ cursor: "pointer" }} />
          </Stack>
          <StyledDivider />
          <AddRole
            action={action}
            data={tableData}
            onSuccess={handleRoleSuccess}
            onClose = {handleClose}
            setIsChange={setIsChange}
            isChange={isChange}
          />
        </Box>
      </Dialog>
    </>
  );
}

// Modal style
const modalStyle = {
  width: "auto", // Adjust width to fit your content or screen
  bgcolor: "#27292F", // Dark background color
  boxShadow: 10,
  p: 2,
  color: "#fff", // White text for better visibility on dark background
  outline: "none", // Remove the focus ring
};
