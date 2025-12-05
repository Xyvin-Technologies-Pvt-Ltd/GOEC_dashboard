import React, { useState } from "react";
import StyledTable from "../../../ui/styledTable";
import LastSynced from "../../../layout/LastSynced";
import { Box, Dialog, Stack, Typography } from "@mui/material";
import { tableHeaderReplace } from "../../../utils/tableHeaderReplace";
import { useNavigate } from "react-router-dom";
import AddEvCharger from "./AddEvCharger";
import { ReactComponent as Close } from "../../../assets/icons/close-icon-large.svg";
import ConfirmDialog from "../../../ui/confirmDialog";
import { toast } from "react-toastify";
import { useDeleteEvModel } from "../../../hooks/mutations/useEvMachineMutation";
import { searchAndFilter } from "../../../utils/search";
import StyledSearchField from "../../../ui/styledSearchField";
import { Transition } from "../../../utils/DialogAnimation";
import { permissions } from "../../../core/routes/permissions";
import { useAuth } from "../../../core/auth/AuthContext";

const tableHeader = [
  "Company Name",
  "Model name",
  "Output Type",
  "OCPP Version",
  "Charger Type",
  "Capacity (kW)",
  "Number of Ports",
];

const EditCharger = ({ data, open, onClose, ...props }) => {
  return (
    <Dialog open={open} maxWidth='md' fullWidth TransitionComponent={Transition}>
      <Stack direction={'row'} sx={{ p: 2, backgroundColor: 'primary.main', justifyContent: 'space-between', borderBottom: 'solid 1px #fff3' }}>
        <Typography sx={{ color: 'secondary.contrastText' }}>Edit Vehicle</Typography>
        <Close style={{ cursor: 'pointer' }} onClick={onClose} />
      </Stack>
      <AddEvCharger editStatus={true} chargerData={data} formSubmitted={onClose} />
    </Dialog>
  )
}


export default function AllEvChargers({ data, updateData, setPageNo, totalCount, setSearchQuery}) {
  const [editOpen, setEditOpen] = useState(false)
  const [selectData, setSelectedData] = useState();
  const [dialogOpen, setDialogOpen] = useState(false)
  const { userCan } = useAuth()
  const deleteEvModelMutation = useDeleteEvModel();

  const evChargerData = tableHeaderReplace(data, ['oem', 'model_name', 'output_type', 'ocpp_version', 'charger_type', 'capacity', 'no_of_ports'], tableHeader)

  const tableActionClick = (e) => {
    setSelectedData(e.data)
    if (e.action === 'Edit') {
      setEditOpen(true);
    } else {
      setDialogOpen(true);
    }
  }

  const deleteData = () => {
    deleteEvModelMutation.mutate(selectData._id, {
      onSuccess: (res) => {
        toast.success("EV charger Deleted successfully")
        updateData && updateData()
      },
      onError: (error) => {
        toast.error(error?.response?.data?.error || "Could not delete EV Charger")
      }
    })
  }

  const handleSearch = (value)=>{
    setSearchQuery(value)
}

  return (
    <>
      <LastSynced heading="EV Chargers" reloadHandle={updateData}>
        <StyledSearchField placeholder={'Search'} onChange={(e) => {
          handleSearch(e.target.value)
        }} />
      </LastSynced>
      <EditCharger open={editOpen} data={selectData} onClose={(() => { setEditOpen(false); updateData(); })} />
      <ConfirmDialog
        open={dialogOpen}
        title={"Confirm Delete"}
        subtitle={"Do you want to Delete"}
        buttonText={"Delete"}
        onClose={() => { setDialogOpen(false) }}
        confirmButtonHandle={deleteData} />
      <Box sx={{ p: 3 }}>
        <StyledTable headers={tableHeader}
          data={evChargerData}
          setPageNo={setPageNo}
          totalCount={totalCount}
          onActionClick={tableActionClick}
          showActionCell={userCan(permissions.evChargersModel.modify)}
          actions={["Edit", "Delete"]} />
      </Box>
    </>
  );
}
