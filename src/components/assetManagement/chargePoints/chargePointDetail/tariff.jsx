import React, { useEffect, useState } from 'react'
import { Box, Grid, Stack, Typography } from '@mui/material'
import { ReactComponent as ReloadIcon } from '../../../../assets/icons/reload.svg'
import StyledSearchField from '../../../../ui/styledSearchField'
import { Tune, FileDownloadOutlined } from '@mui/icons-material'
import StyledTable from '../../../../ui/styledTable'
import { chargerLogData } from '../../../../assets/json/chargepoints'
import StyledButton from '../../../../ui/styledButton'
import AssignedTarrif from './tariff/assignedTarrif'
import LastSynced from '../../../../layout/LastSynced'
import AssignTarrif from './tariff/assigntTarrif'
import { useChargerTariffDetail } from '../../../../hooks/queries/useEvMachine';
import { useChangeEvTariff } from '../../../../hooks/mutations/useEvMachineMutation';
import { toast } from 'react-toastify'




export default function Tariff({ CPID, id }) {
    const [addOpen, setAddOpen] = useState(false)
    const { data: tarrifDetails = [], refetch: refetchTariffs } = useChargerTariffDetail(CPID);
    const changeEVTariffMutation = useChangeEvTariff();

    const unAssinHandle = () => {
        changeEVTariffMutation.mutate(
            { evMachine: id, data: {} },
            {
                onSuccess: (res) => {
                    refetchTariffs();
                    toast.success("Tariff unassigned successfully");
                },
                onError: (error) => {
                    toast.error(error?.response?.data?.error || "Failed to unassign tariff");
                }
            }
        )
    }

    return (
        <>
            <AssignTarrif open={addOpen} onClose={() => setAddOpen(false)} CPID={id} updated={refetchTariffs} />
            <LastSynced heading='Tariff' reloadHandle={refetchTariffs}>
                <StyledButton variant={'primary'} style={{ width: '160px' }} onClick={() => setAddOpen(true)}>Assign Tariff</StyledButton>
            </LastSynced>
            <Grid container p={2}>
                {
                    tarrifDetails.map((dt, ind) => (
                        <Grid item xs={12} md={3} xl={2} key={ind}>
                            <AssignedTarrif data={dt} unassignedHandle={unAssinHandle} />
                        </Grid>
                    ))
                }

            </Grid>
        </>
    )
}
