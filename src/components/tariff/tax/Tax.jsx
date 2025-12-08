import React, { useState } from "react";
import { Box, Modal, Stack, Typography } from "@mui/material";
import StyledTable from "../../../ui/styledTable";
import LastSynced from "../../../layout/LastSynced";
import StyledDivider from "../../../ui/styledDivider";
import { ReactComponent as Close } from "../../../assets/icons/close-circle.svg";
import { toast } from "react-toastify";

import AddTax from "./addTax";
import StyledButton from "../../../ui/styledButton";
import StyledSearchField from "../../../ui/styledSearchField";
import { tableHeaderReplace } from "../../../utils/tableHeaderReplace";
import { useDeleteTax } from "../../../hooks/mutations/useTaxMutation";
import { searchAndFilter } from "../../../utils/search";
import { useAuth } from "../../../core/auth/AuthContext";
import { permissions } from "../../../core/routes/permissions";
function Tax({ data, headers, onIsChange, isChange, updateData, setPageNo, totalCount, setSearchQuery }) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("add");
  const [tableData, setTableData] = useState();
  const { userCan } = useAuth();
  const deleteTaxMutation = useDeleteTax();

  // Function to open the modal
  const handleOpen = () => {
    setAction("add");
    setOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (e) => {
    if (e.action === "Edit") {
      setAction("edit");
      setOpen(true);
      setTableData(e.data);
    } else if (e.action === "Delete") {
      setAction("delete");
      deleteTaxMutation.mutate(e.data._id, {
        onSuccess: () => {
          toast.success("Tax deleted successfully", {
            position: "top-right",
          });
          onIsChange(!isChange);
        },
        onError: () => {
          toast.error("Failed to delete tax", {
            position: "top-right",
          });
        },
      });
    }
  };

  const taxData = tableHeaderReplace(data, ["name", "percentage","status" ,"createdAt"], headers);

  const handleSearch = (value)=>{
    setSearchQuery(value)
}

  return (
    <>
      <LastSynced heading="Tax" reloadHandle={updateData}>
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
        <StyledTable headers={headers} 
        data={taxData} 
        setPageNo={setPageNo}
        totalCount={totalCount}
        onActionClick={handleClick}
        showActionCell={userCan(permissions.tax.modify)}
        actions={["Edit","Delete"]}
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
              {action === "edit" ? 'Edit' : 'Add'} Tariff
            </Typography>
            <Close onClick={handleClose} style={{ cursor: "pointer" }} />
          </Stack>
          <StyledDivider />
          <AddTax action={action} data={tableData} onIsChange={onIsChange} isChange={isChange} setOpen={setOpen}/>
        </Box>
      </Modal>
    </>
  );
}

export default Tax;

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
