import { CalendarMonth, AccountBalanceWalletOutlined } from '@mui/icons-material'
import { Box, Grid, Stack, Typography } from '@mui/material'
import { TimeIcon } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import StyledButton from '../../../../ui/StyledButton'
import AddTopup from './addTopup'
import DeductWallet from './deductWallet'

export default function WalletInfo({data, onIsChange, isChange}) {
    const [topupOpen,setTopupOpen] = useState(false)
    const [deductOpen,setDeductOpen] = useState(false)
    // const dateMoment = moment(data.createdAt);
    // ! Last Top-up on data is not available
    return (
        <Box sx={{ backgroundColor: 'secondary.main', borderRadius: '4px', p: {xs:2,md:4} }}>
            <AddTopup open={topupOpen} onClose={()=>{setTopupOpen(false)}} userData={data} onIsChange={onIsChange} isChange={isChange}/>
            <DeductWallet open={deductOpen} onClose={()=>{setDeductOpen(false)}} userData={data} onIsChange={onIsChange} isChange={isChange}/>
          
            <Grid container spacing={2}>
                <Grid item xs={12} md={7.5} >
                    <Typography variant='subtitle1' sx={{ py: 0.5, fontWeight: 700 }} >Wallet</Typography>
                    <Stack direction={'row'} sx={{ p: {xs:2,md:1,xl:2}, backgroundColor: 'secondary.cardbg', borderRadius: '4px', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant='subtitle2' sx={{ color: 'secondary.contrastText' }}>Last Top-up on</Typography>
                            <Stack direction={'row'} spacing={2}>
                                <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                                    <CalendarMonth sx={{ fontSize: '14px' }} />
                                    <Typography variant='subtitle2'>22 Jun 22</Typography>
                                </Stack>
                                <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                                    <TimeIcon sx={{ fontSize: '14px' }} />
                                    <Typography variant='subtitle2'>4:57 PM</Typography>
                                </Stack>
                            </Stack>
                        </Box>
                        <Typography variant='h5' sx={{ color: 'success.main' }}>₹ {data?.wallet && data?.wallet.toFixed(2)}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={2} p={3.5} sx={{ justifyContent: 'center' }}>
                        <StyledButton variant='primary' style={{ width: '180px', height: '40px', fontSize: '14px' }} onClick={()=>{setTopupOpen(true)}}>TOP-UP</StyledButton>
                        <StyledButton variant='secondary' style={{ width: '180px', height: '40px', fontSize: '14px' }} onClick={()=>{setDeductOpen(true)}}>DEDUCT</StyledButton>
                    </Stack>
                </Grid>
                <Grid item xs={12}  md={4.5}>
                    <Box sx={{ backgroundColor: 'secondary.cardbg',p:{md:1,xl:4} }}>
                        <Stack direction={'column'} sx={{ p: 3 }} spacing={1}>
                            <Box sx={{color:'#B09BE2'}}>
                                <AccountBalanceWalletOutlined />
                                <Typography>Wallet Balance</Typography>
                            </Box>
                            <Typography variant='h5'>₹ {data?.wallet && data?.wallet.toFixed(2)}</Typography>
                        </Stack>

                    </Box>
                </Grid>
            </Grid>

        </Box>
    )
}
