import React, { useState } from "react";
import { Box, Modal, Stack, Typography } from "@mui/material";
import StyledTable from "../../../ui/styledTable";
import LastSynced from "../../../layout/LastSynced";
import { ReactComponent as Close } from "../../../assets/icons/close-circle.svg";
import StyledDivider from "../../../ui/styledDivider";
import AddTariff from "./addTariff";
import StyledButton from "../../../ui/styledButton";
import { useDeleteChargingTariff } from "../../../hooks/mutations/useChargingTariffMutation";
import { ToastContainer, toast } from "react-toastify";
import { tableHeaderReplace } from "../../../utils/tableHeaderReplace";
import StyledSearchField from "../../../ui/styledSearchField";
import { searchAndFilter } from "../../../utils/search";
import { permissions } from "../../../core/routes/permissions";
import { useAuthStore } from "../../../store";

function restructureData(dataArray) {
  return dataArray.map((item) => ({
    _id: item._id,
    name: item.name,
    serviceAmount: item.serviceAmount,
    value: item.value,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    taxDataName: item.taxData?.name,
  }));
}

function ChargingTariff({ data, headers, onIsChange, isChange, updateData, setPageNo, totalCount, setSearchQuery }) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("add");
  const [tableData, setTableData] = useState();
  const hasPermission = useAuthStore((state) => state.hasPermission)
  // Function to open the modal
  const handleOpen = () => {
    setOpen(true);
    setAction("add");
  };

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
  };

  // Use TanStack Query mutation hook for delete
  const deleteMutation = useDeleteChargingTariff({
    onSuccess: () => {
      toast.success("Tariff deleted successfully", { position: "top-right" });
      onIsChange(!isChange);
    },
    onError: () => {
      toast.error("Failed to delete tariff", { position: "top-right" });
    },
  });

  const handleClick = (e) => {
    if (e.action === "Edit") {
      setAction("edit");
      setOpen(true);
      setTableData(e.data);
    } else if (e.action === "Delete") {
      deleteMutation.mutate(e.data._id);
    }
  };

  const restructuredData = restructureData(data);

  const chargingTariffData = tableHeaderReplace(
    restructuredData,
    ["name", "value", "serviceAmount", "createdAt", "updatedAt", "taxDataName"],
    headers
  );

  const handleSearch = (value)=>{
    setSearchQuery(value)
}

  return (
    <>
      <LastSynced heading="Charge Tariff" reloadHandle={updateData}>
        <StyledSearchField
          placeholder={"Search"}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </LastSynced>
      <Box sx={{ p: 3 }}>
        <Box display="flex" justifyContent="flex-end">
          <StyledButton variant="primary" width="150" mr="10" onClick={handleOpen}>
            Add
          </StyledButton>
        </Box>
        <StyledTable
          headers={headers}
          data={chargingTariffData}
          setPageNo={setPageNo}
          totalCount={totalCount}
          onActionClick={handleClick}
          showActionCell={hasPermission(permissions.chargingTariff.modify)}
          actions= {["Edit","Delete"]}
        />
      </Box>
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
              {action === "add" ? "Add" : "Edit"} Tariff
            </Typography>
            <Close onClick={handleClose} style={{ cursor: "pointer" }} />
          </Stack>
          <StyledDivider />
          <AddTariff
            action={action}
            data={tableData}
            onIsChange={onIsChange}
            isChange={isChange}
            onClose = {handleClose}
            updateData={() => {
              setOpen(false);
              updateData();
            }}
            setOpen={setOpen}
          />
        </Box>
      </Modal>
    </>
  );
}

export default ChargingTariff;

// Modal style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto", // Adjust width to fit your content or screen
  bgcolor: "#27292F", // Dark background color
  boxShadow: 10,
  p: 4,
  color: "#fff", // White text for better visibility on dark background
  outline: "none", // Remove the focus ring
};
