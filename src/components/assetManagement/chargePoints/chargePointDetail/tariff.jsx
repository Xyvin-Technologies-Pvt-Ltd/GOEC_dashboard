import React, { useMemo, useState } from 'react'
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

function normalizeTariffList(payload) {
    if (payload == null) return []
    if (Array.isArray(payload)) return payload
    if (Array.isArray(payload.result)) return payload.result
    if (payload.result != null && typeof payload.result === 'object') return [payload.result]
    return []
}

export default function Tariff({ CPID, id }) {
    const [addOpen, setAddOpen] = useState(false)
    const { data: tariffPayload, refetch: refetchTariffs } = useChargerTariffDetail(CPID);
    const tarrifDetails = useMemo(() => normalizeTariffList(tariffPayload), [tariffPayload])
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
                        <Grid item xs={12} md={3} xl={2} key={dt?._id ?? ind}>
                            <AssignedTarrif data={dt} unassignedHandle={unAssinHandle} />
                        </Grid>
                    ))
                }

            </Grid>
        </>
    )
}
