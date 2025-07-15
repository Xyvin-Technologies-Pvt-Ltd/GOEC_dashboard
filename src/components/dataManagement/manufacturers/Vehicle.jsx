import React, { useState } from 'react'
import StyledTable from "../../../ui/styledTable";
import LastSynced from "../../../layout/LastSynced";
import { Box } from "@mui/material";
import StyledSearchField from '../../../ui/styledSearchField';
import StyledButton from '../../../ui/styledButton';
import AddVehicle from './addVehicle/AddVehicle';
import { toast } from "react-toastify";
import { tableHeaderReplace } from '../../../utils/tableHeaderReplace';
import { deleteBrand } from '../../../services/vehicleAPI';
import ConfirmDialog from '../../../ui/confirmDialog';
import { useAuth } from '../../../core/auth/AuthContext';
import { permissions } from '../../../core/routes/permissions';


const tableHeader = [
  "Company Name",
  "Created On"
];

export default function Vehicles({ data, updateData, setPageNo1, totalCount1, setSearchQuery1  }) {
  const [open, setOpen] = useState(false)
  const [editStatus, setEditStatus] = useState(false)
  const [selectData, setSelectedData] = useState()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const { userCan } = useAuth()

  const brandData = tableHeaderReplace(data, ['brandName', 'createdAt'], tableHeader)


  const tableActionClick = (e) => {
    if (e.action === "Edit") {
      setSelectedData(e.data)
      setEditStatus(true)
      setOpen(true)
    }
    else {
      setSelectedData(e.data)
      setConfirmOpen(true)
    }
  }


  const deleteBRAND = () => {
    deleteBrand(selectData._id).then((res) => {
      toast.success("OEM Deleted successfully");
      updateData && updateData()

    }).catch((error) => {
      toast.success(`${error}`);
      updateData && updateData()
    })
  }

  const handleSearch = (value)=>{
    setSearchQuery1(value)
}

  return (
    <>

      <AddVehicle open={open} onClose={() => { setOpen(false); setEditStatus(false); updateData() }} editStatus={editStatus} editData={selectData} />
      <ConfirmDialog title='OEM Delete' subtitle='Do you want to Delete OEM?' open={confirmOpen} onClose={() => { setConfirmOpen(false) }} confirmButtonHandle={deleteBRAND} />
      <LastSynced heading="Brand" reloadHandle={updateData}>
        <StyledSearchField placeholder={"Search"} onChange={(e) => {
          handleSearch(e.target.value)
        }} />
        <StyledButton variant={'primary'} style={{ width: '100%', minWidth: '160px' }} onClick={() => { setOpen(true) }}>Add</StyledButton>
      </LastSynced>

      <Box sx={{ p: 3 }}>
        <StyledTable headers={tableHeader} 
        data={brandData} 
        setPageNo={setPageNo1}
        totalCount={totalCount1}
        actions={["Edit", "Delete"]} 
        showActionCell={userCan(permissions.manufacture.modify)}
        onActionClick={tableActionClick} />
      </Box>
    </>)
}
