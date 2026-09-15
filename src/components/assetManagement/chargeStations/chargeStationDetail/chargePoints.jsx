import React, { useEffect, useState } from 'react'
import { Box, Dialog, Stack, Typography } from '@mui/material'
import StyledButton from '../../../../ui/styledButton'
import StyledTable from '../../../../ui/styledTable'
import AddChargePoint from '../../chargePoints/AddChargePoint'
import LastSynced from '../../../../layout/LastSynced'
import { useNavigate } from 'react-router-dom'
import { Transition } from '../../../../utils/DialogAnimation'
import { ReactComponent as Close } from "../../../../assets/icons/close-icon-large.svg";
import { toast } from 'react-toastify'
import { useDeleteEvMachine } from '../../../../hooks/mutations/useEvMachineMutation';

const tableHeader = [
  'CPID',
  'OEM',
  'Model',
  'Tariff',
  'Status',
  'Published'
]


export default function ChargePoints({ data, stationId, dataUpdate, ...props }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [editStatus, setEditStatus] = useState(false)
  const [selectedData, setSelectedData] = useState()
  const deleteEvMachineMutation = useDeleteEvMachine();

  const [allChargePointsData, setAllChargePointsData] = useState([])
  useEffect(() => {
    const dt = data.map((item) => (
      {
        '_id': item._id,
        'CPID': item.CPID,
        'OEM': item.evModelDetails[0]?.oem,
        'Model': item.evModelDetails[0]?.model_name,
        'Tariff': item.chargingTariffDetails[0] ? item.chargingTariffDetails[0]?.tax_name : '',
        'Status': item.cpidStatus,
        'Published': item.published,
        ...item
      }))
    setAllChargePointsData(dt)
  }, [data])
  const actionButtonHandle = (e) => {
    if (e.action === 'View') {
      navigate(`/charge-point-detail/${e.data._id}`)
    }
    else if (e.action === 'Edit') {
      setSelectedData(e.data)
      setEditStatus(true);
      setOpen(true)
    }
    else if (e.action === 'Delete') {
      deleteData(e.data)
      
    }
  }
  const formSubmitHandle = () => {
    dataUpdate();
    setOpen(false);
  }

  const deleteData = (data) => {
    deleteEvMachineMutation.mutate(data._id, {
      onSuccess: (res) => {
        toast.success("Charge point deleted successfully")
        dataUpdate()
      },
      onError: (error) => {
        toast.error(error?.response?.data?.error || "Failed to delete charge point")
      }
    })
  }


  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth
      >
        <Stack direction={'row'} sx={{ p: 2, backgroundColor: 'primary.main', justifyContent: 'space-between', borderBottom: 'solid 1px #fff3' }}>
          <Typography sx={{ color: 'secondary.contrastText' }}>{editStatus ? 'Edit' : 'Add'} Chargepoint</Typography>
          <Close style={{ cursor: 'pointer' }} onClick={() => { setOpen(false) }} />
        </Stack>
        <AddChargePoint onClose={() => setOpen(false)} editStatus={editStatus} isFromStation={true} stationId={stationId} chargepointData={selectedData} formsubmitted={formSubmitHandle} />
      </Dialog>
      <LastSynced heading={'Charge-points'} reloadHandle={dataUpdate}>
        <StyledButton variant='primary' style={{ width: '100%', height: '45px', fontSize: '14px', fontWeight: '400' }} onClick={() => { setEditStatus(false); setOpen(true) }}> Add Chargepoint</StyledButton>
      </LastSynced>
      <Box sx={{ p: 3 }}>
        {data.length > 0 && <StyledTable headers={tableHeader} data={allChargePointsData} actions={["View", "Edit","Delete"]} onActionClick={actionButtonHandle} />}
      </Box>
    </>
  )
}
