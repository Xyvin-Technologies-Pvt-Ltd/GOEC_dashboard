import { Alert, Box, Grid, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import StationDetail from './chargeStationDetail/stationDetail'
import OwnerDetail from './chargeStationDetail/ownerDetail'
import Analytics from './chargeStationDetail/analytics'
import { Stack } from '@mui/system'
import { ArrowBackIosNew } from '@mui/icons-material'
import StyledTab from '../../../ui/styledTab'
import ChargePoints from './chargeStationDetail/chargePoints'
import Reviews from './chargeStationDetail/reviews'
import { useNavigate, useParams } from 'react-router-dom'
import { useChargingStationById } from '../../../hooks/queries/useChargingStation'
import { useDeleteReview } from '../../../hooks/mutations/useReviewMutation'
import StyledBackdropLoader from '../../../ui/styledBackdropLoader'
import ConfirmDialog from '../../../ui/confirmDialog'

export default function ChargeStationDetail() {
    const { id } = useParams();
    const [toggleOption, setToggleoption] = useState(0)
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const [selectedReview, setSelectedReview] = useState(false)
    const [errorMsg, setErrorMsg] = useState();
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const navigate = useNavigate()

    // TanStack Query hooks
    const { data: stationData, isLoading, refetch } = useChargingStationById(id);
    const { mutate: removeReview } = useDeleteReview({
        onSuccess: () => {
            setErrorMsg(<Alert severity="success" sx={{ width: '100%' }}>Review deleted </Alert>);
            setSnackbarOpen(true);
            refetch();
        },
    });

    // Extract data with safe defaults
    const stationDetails = stationData?.result;

    const onChangeToggleOption = (e) => {
        setToggleoption(e.index)
    }

    const reviewDelete = () => {
        removeReview(selectedReview._id);
    }

    return (
        <>
            <StyledBackdropLoader open={isLoading} />
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => { setSnackbarOpen(false) }}
            >{errorMsg}</Snackbar>
            <ConfirmDialog title='Delete Review' subtitle='Do you want to delete review?' open={confirmDialogOpen} onClose={() => { setConfirmDialogOpen(false) }} confirmButtonHandle={reviewDelete} />
            <Stack direction={'row'} sx={{ backgroundColor: 'secondary.main', p: 3 }} spacing={2}>
                <ArrowBackIosNew sx={{ cursor: 'pointer' }} onClick={() => { navigate(-1) }} />
                <Typography variant='h6' color={'secondary.contrastText'}>Charge Station Details</Typography></Stack>
            {stationDetails &&
                <Box sx={{ p: { xs: 1, md: 4 } }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={12} lg={6}>
                            <StationDetail data={stationDetails} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <OwnerDetail data={stationDetails} />
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <Analytics data={stationDetails} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            }
            <StyledTab buttons={['Charge-points', 'Reviews']} onChanged={onChangeToggleOption} />
            {stationDetails && (toggleOption === 0 ?
                <ChargePoints data={stationDetails && stationDetails.chargers} stationId={stationDetails && stationDetails._id} dataUpdate={refetch} /> :
                <Reviews data={stationDetails && stationDetails.reviews} deleteClickHandle={(data) => { setConfirmDialogOpen(true); setSelectedReview(data) }} dataUpdate={refetch} />)}
        </>
    )
}
