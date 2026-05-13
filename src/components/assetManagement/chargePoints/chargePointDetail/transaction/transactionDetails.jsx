import { Box, Dialog, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { Transition } from '../../../../../ui/DialogAnimation';
import { ReactComponent as Close } from "../../../../../assets/icons/close-icon-large.svg";
import { Star } from '@mui/icons-material';



export default function TransactionDetails({ open, onClose, data }) {
    console.log("🚀 ~ TransactionDetails ~ data:", data)
    return (
        <Dialog fullWidth maxWidth='sm' open={open} onClose={onClose && onClose} TransitionComponent={Transition}>
            <Stack direction={'row'} sx={{ p: 2, backgroundColor: 'secondary.main', justifyContent: 'space-between', borderBottom: 'solid 1px #fff3' }}>
                <Typography variant='h6' sx={{ color: 'primary.contrastText' }}>Charging Summary</Typography>
                <Close style={{ cursor: 'pointer' }} onClick={onClose && onClose} />
            </Stack>
            <Stack direction={'column'} >
                <Grid container spacing={2} sx={{p:2,backgroundColor:'#212326'}}>
                    <Grid item xs={3}>
                        <Box sx={{ borderRadius: '5px', overflow: "hidden", height: {xs:'80px',md:'130px'} }}>
                            <img src={`https://previews.123rf.com/images/aquir/aquir1311/aquir131100316/23569861-sample-grunge-red-round-stamp.jpg`}
                                style={{
                                    objectFit: 'cover',
                                    height: '100%',
                                    width: '100%'
                                }} />
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Stack direction={'column'}>
                            <Stack direction={'row'} sx={{ color: '#F2994A', backgroundColor: '#FFFAEA', borderRadius: '15px', width: '50px', justifyContent: 'center' }}>
                                <Star fontSize='12px' />
                                <Typography fontSize={'12px'}>5</Typography>
                            </Stack>
                            <Stack direction={'column'} spacing={'5px'} sx={{ mt: 2 }}>
                                <Typography sx={{fontSize:{xs:'16px',md:'24px'},fontWeight:700,color:'secondary.contrastText'}}>{data && data['Chargepoint ID']}</Typography>
                                <Typography variant='subtitle2' sx={{ color: 'secondary.contrastText', fontSize: '12px', fontWeight: '400' }}>{data && data['Location Name']}</Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#211F26',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Customer name</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>{data && data['Username']}</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#2B2930',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Vehicle number</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>{data && data['vehicleNum']}</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#211F26',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Vehicle model</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>{data && data.vehilcleInfo.modelName}</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#2B2930',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Chargepoint</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>{data && data['Chargepoint ID']}</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#211F26',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Connector type</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>{data && data.vehilcleInfo.compactable_port}</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#2B2930',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Connector ID</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>{data && data['connectorId']}</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#211F26',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Charging start</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>{data && data['startTime']}</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#2B2930',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Charging End</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>{data && data['endTime']}</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#211F26',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Duration</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>{data && data['Duration(hh:mm:ss)']}</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#2B2930',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Delivered Energy</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>{data && data['Units Consumed']}</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#211F26',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Session ID</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>{data && data['id']}</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#2B2930',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Tariff</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>-</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#211F26',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Meter start</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>{data && data['meterStart']}</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#2B2930',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Meter stop</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>{data && data['meterStop']}</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#211F26',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Initial Soc</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>{data && data['startSoc']}</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#2B2930',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Last Soc</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>{data && data['currentSoc']}</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#211F26',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Tax Type</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>-</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#2B2930',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Tax Rate</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>-</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',backgroundColor:'#211F26',px:2,py:1}}>
                    <Typography variant='body1' color='primary.contrastText' sx={{fontWeight:300}}>Total Tax amount</Typography>
                    <Typography variant='body1' color='secondary.contrastText' sx={{fontWeight:100}}>-</Typography>
                </Stack>
                <Stack direction={'row'} sx={{justifyContent:'space-between',alignItems:'center',backgroundColor:'#212326',p:2}}>
                    <Typography variant='h6' color='primary.contrastText' sx={{fontWeight:500}}>Total Amount</Typography>
                    <Typography variant='h5' color='#6FCC60' sx={{fontWeight:800}}>{data && data['Total Amount']}</Typography>
                </Stack>
            </Stack>
        </Dialog>
    )
}
