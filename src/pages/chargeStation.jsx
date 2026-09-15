import { Box, Dialog, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import StyledTab from '../ui/styledTab'
import AllChargeStation from '../components/assetManagement/chargeStations/allChargeStation';
import AddChargingStation from '../components/assetManagement/chargeStations/AddChargingStation';
import { useChargingStationList } from '../hooks/queries/useChargingStation';
import { useDeleteChargingStation } from '../hooks/mutations/useChargingStationMutation';
import ConfirmDialog from '../ui/confirmDialog';
import { ReactComponent as Close } from "../assets/icons/close-icon-large.svg";
import { toast } from 'react-toastify';
import { Transition } from '../utils/DialogAnimation';

export default function ChargingStation() {
  const [togglePage, setTogglePage] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filters = { pageNo };
  if (searchQuery) {
    filters.searchQuery = searchQuery;
  }

  const { data: stationData, refetch } = useChargingStationList(filters);
  const chargeStationListData = stationData?.result || [];
  const totalCount = stationData?.totalCount || 1;

  const { mutate: deleteStation } = useDeleteChargingStation({
    onSuccess: () => {
      toast.success("charging station deleted successfully");
    }
  });

  const deleteData = () => {
    if (selectedData?._id) {
      deleteStation(selectedData._id);
    }
  }

  const buttonChanged = (e) => {
    setTogglePage(e.index);
  };

  return (
    <Box>
      <ConfirmDialog
        open={dialogOpen}
        title={"Confirm Delete"}
        subtitle={"Do you want to Delete"}
        buttonText={"Delete"}
        onClose={() => { setDialogOpen(false) }}
        confirmButtonHandle={deleteData} />
      <Dialog open={editDialogOpen} maxWidth='md' fullWidth TransitionComponent={Transition}>
        <Stack direction={'row'} sx={{ p: 2, backgroundColor: 'primary.main', justifyContent: 'space-between', borderBottom: 'solid 1px #fff3' }}>
          <Typography sx={{ color: 'secondary.contrastText' }}>Edit ChargeStation</Typography>
          <Close style={{ cursor: 'pointer' }} onClick={() => { setEditDialogOpen(false) }} />
        </Stack>
        <AddChargingStation formSubmited={() => { refetch(); setEditDialogOpen(false) }} data={selectedData} editStatus={true} />
      </Dialog>
      <StyledTab
        activeIndex={togglePage}
        buttons={['All Charge stations', 'Add Charge Station']} onChanged={buttonChanged} />
      {togglePage === 0 ?
        <AllChargeStation
          data={chargeStationListData}
          deleteData={(data) => { setSelectedData(data); setDialogOpen(true) }}
          editData={(data) => { setSelectedData(data); setEditDialogOpen(true) }}
          reloadData={() => refetch()}
          setPageNo={setPageNo}
          totalCount={totalCount}
          setSearchQuery={setSearchQuery}
        /> :
        <AddChargingStation formSubmited={() => { refetch(); setTogglePage(0) }} />}
    </Box>
  );
}
