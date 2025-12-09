import { Box, Dialog, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StyledTab from '../ui/styledTab'
import AllChargePoint from '../components/assetManagement/chargePoints/allChargePoint';
import AddChargePoint from '../components/assetManagement/chargePoints/AddChargePoint';
import ConfirmDialog from '../ui/confirmDialog';
import { ReactComponent as Close } from "../assets/icons/close-icon-large.svg";
import { toast } from 'react-toastify';
import { Transition } from '../utils/DialogAnimation';
import { useEvMachineList } from '../hooks/queries/useEvMachine';
import { useDeleteEvMachine } from '../hooks/mutations/useEvMachineMutation';
export default function ChargingPoints() {
  const [togglePage, setTogglePage] = useState(0);
  const [chargePointListData, setChargePointListData] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ pageNo: 1 });

  // Use the query hook to fetch EV machine list
  const { data: machineListData = {}, refetch } = useEvMachineList(filters);
  
  // Use the delete mutation hook
  const deleteEvMachineMutation = useDeleteEvMachine();

  // Update state when hook data changes
  useEffect(() => {
    if (machineListData.result) {
      setChargePointListData(machineListData.result);
      setTotalCount(machineListData.totalCount || 0);
    }
  }, [machineListData]);

  // Update filters when pageNo or searchQuery changes
  useEffect(() => {
    const newFilters = { pageNo };
    if (searchQuery) {
      newFilters.searchQuery = searchQuery;
    }
    setFilters(newFilters);
  }, [pageNo, searchQuery]);

  const deleteData = () => {
    deleteEvMachineMutation.mutate(selectedData._id, {
      onSuccess: () => {
        refetch();
        toast.success("charging station deleted successfully");
        setDialogOpen(false);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.error || "Failed to delete charging station");
      },
    });
  };

  const buttonChanged = (e) => {
    setTogglePage(e.index)
  }
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
        <AddChargePoint formsubmitted={() => { refetch(); setEditDialogOpen(false); }} chargepointData={selectedData} editStatus={true} />
      </Dialog>
      <StyledTab activeIndex={togglePage} buttons={['All Chargepoints', 'Add chargepoints']} onChanged={buttonChanged} />
      {togglePage === 0 ? <AllChargePoint
        data={chargePointListData}
        setSearchQuery={setSearchQuery}
        setPageNo={setPageNo} 
        totalCount={totalCount}
        deleteData={(data) => { setSelectedData(data); setDialogOpen(true) }}
        editData={(data) => { setSelectedData(data); setEditDialogOpen(true) }} 
        reloadData={refetch}/> : 
        <AddChargePoint formsubmitted={() => { refetch(); setTogglePage(0); }} />}
    </Box>
  )
}