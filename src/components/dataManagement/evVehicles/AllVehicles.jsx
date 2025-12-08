import React, { useState } from "react";
import StyledTable from "../../../ui/styledTable";
import LastSynced from "../../../layout/LastSynced";
import { Box, Dialog, Stack, Typography } from "@mui/material";
import StyledSearchField from "../../../ui/styledSearchField";
import { tableHeaderReplace } from "../../../utils/tableHeaderReplace";
import { useDeleteVehicle } from "../../../hooks/mutations/useVehicleMutation";
import { toast } from "react-toastify";
import AddVehicles from "./AddVehicles";
import { ReactComponent as Close } from "../../../assets/icons/close-icon-large.svg";
import { Transition } from "../../../utils/DialogAnimation";
import { useAuthStore } from "../../../store";
import { permissions } from "../../../core/routes/permissions";

const tableHeader = [
  "Company Name",
  "Model name",
  "Charger Type",
  "Number of Ports",
];

const EditVehicle = ({data, open, onClose, ...props }) => {
  return (
    <Dialog open={open} maxWidth='sm' fullWidth TransitionComponent={Transition}>
      <Stack direction={'row'} sx={{ p: 2, backgroundColor: 'primary.main', justifyContent: 'space-between', borderBottom: 'solid 1px #fff3' }}>
        <Typography sx={{ color: 'secondary.contrastText' }}>Edit Vehicle</Typography>
        <Close style={{ cursor: 'pointer' }} onClick={onClose} />
      </Stack>
      <AddVehicles editStatus={true} vehicleData={data} onClose={onClose} />
    </Dialog>
  )
}

export default function AllVehicles({ data, setPageNo, totalCount, setSearchQuery, updateData, ...props }) {
  const [selectData, setSelectedData] = useState();
  const [editOpen, setEditOpen] = useState(false);
  const deleteVehicleMutation = useDeleteVehicle();
  const VehicleData = tableHeaderReplace(data, ['brand', 'modelName', 'charger_types', 'number_of_ports'], tableHeader)
  const hasPermission = useAuthStore((state) => state.hasPermission)
  const tableActionClick = (e) => {
    if (e.action === "Edit") {
      setSelectedData(e.data)
      setEditOpen(true);
    }
    else if (e.action === "Delete") {
      deleteVEHICLE(e.data)
    }
  }

  const deleteVEHICLE = (vehicleData) => {
    deleteVehicleMutation.mutate(vehicleData._id, {
      onSuccess: () => {
        toast.success("Vehicle deleted successfully");
        updateData && updateData();
      },
      onError: () => {
        toast.error("Unable to delete vehicle");
      },
    });
  }

  const handleSearch = (value)=>{
    setSearchQuery(value)
}

  return (
    <>
      <EditVehicle open={editOpen} data={selectData} onClose={(() => { setEditOpen(false); updateData && updateData() })} />
      <LastSynced heading="EV Vehicles" reloadHandle={updateData} >
        <StyledSearchField
          placeholder={"Search"}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </LastSynced>
      <Box sx={{ p: 3 }}>
        <StyledTable headers={tableHeader} 
        data={VehicleData} 
        setPageNo={setPageNo}
        totalCount={totalCount}
        onActionClick={tableActionClick} 
        showActionCell={hasPermission(permissions.evVehicle.modify)}
        actions={["Edit", "Delete"]} />
      </Box>
    </>
  );
}
