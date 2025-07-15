import React, { useState } from 'react'
import { Box, Dialog } from '@mui/material'
import StyledTable from '../../../ui/styledTable'
import StyledButton from '../../../ui/styledButton'
import LastSynced from '../../../layout/LastSynced'
import AddRfidCard from '../Rfid/AddRfidCard'
import AddBulkRfidCard from './AddBulkRfidCard'
import { tableHeaderReplace } from '../../../utils/tableHeaderReplace'
import { Transition } from '../../../utils/DialogAnimation'
import ConfirmDialog from '../../../ui/confirmDialog'
import { deleteRfid } from '../../../services/rfidAPI'
import { toast } from 'react-toastify'
import { useAuth } from '../../../core/auth/AuthContext'
import { permissions } from '../../../core/routes/permissions'



const tableHeader = [
  'RFID Tag',
  'User Name',
  'Serial No',
  'Created On',
  'Expires On',
  'Balance',
  'Status'
]


const AllRfidCards = ({ data, updateData, setPageNo, totalCount }) => {
  const [open, setOpen] = useState(false);
  const [isComponent, setIsComponent] = useState(0); // State to track which component to render

  const [selectData, setselectData] = useState()
  const [editstatus, setEditStatus] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const { userCan } = useAuth()
  const rfData = tableHeaderReplace(data, ['rfidTag', 'username','serialNumber', 'createdAt', 'expiry', 'balance', 'status'], tableHeader)


  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
    updateData()
  };

  // Function to switch between AddRfidCard and AddBulkRfidCard
  const toggleAddMode = (status) => {
    setEditStatus(false)
    setIsComponent(status);
    setOpen(true);
  };

  const handleClick = (e) => {

    if (e.action === "Edit") {
      setselectData(e.data);
      setIsComponent(0);
      setEditStatus(true);
      setOpen(true);
    } else if (e.action === "Delete") {
      setselectData(e.data);
      setConfirmOpen(true);
    }

  };

  const deleteRFID = () => {
    deleteRfid(selectData._id).then((res) => {
      updateData()
      toast.success("RFID Deleted Successfully")
      setConfirmOpen(false)
    }).catch((error) => {
      toast.error(error.response.data.error)
    })
  }

  return (
    <>
      <ConfirmDialog title='Delete RFID Tag' subtitle='Doyou want to Delete ?' open={confirmOpen} onClose={() => setConfirmOpen(false)} buttonText='Delete' confirmButtonHandle={deleteRFID} />
      <LastSynced heading="RFID Cards" reloadHandle={updateData} />
      <Box sx={{ p: 3 }}>
        <Box display="flex" justifyContent="flex-end">
          <StyledButton variant='secondary' width='150' mr='10' onClick={() => toggleAddMode(0)}>Add</StyledButton>
          <StyledButton variant='primary' width='150' onClick={() => toggleAddMode(1)}>Add Bulk</StyledButton>
        </Box>
        <StyledTable
          headers={tableHeader}
          data={rfData}
          setPageNo={setPageNo}
          totalCount={totalCount}
          onActionClick={(e) => handleClick(e)}
          showActionCell={userCan(permissions.rfid.modify)}
          actions={["Edit", "Delete"]} />
      </Box>
      {/* Modal */}
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {isComponent === 0 ? <AddRfidCard Close={handleClose} editStatus={editstatus} rfidData={selectData} /> : <AddBulkRfidCard Close={handleClose} />}

      </Dialog>
    </>
  )
}

export default AllRfidCards