import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import StyledInput from '../../../../ui/StyledInput'
import StyledButton from '../../../../ui/StyledButton'
import StyledSelectField from '../../../../ui/StyledSelectField'
import { AccountCircle, Autorenew } from '@mui/icons-material'

const UserNameComponent = ({isuser=false}) => {
    return (
        <Stack direction={'row'} sx={{ p: 2, justifyContent: 'space-between', backgroundColor: 'secondary.lightGray', borderRadius: '4px', border: '1px solid #fff3' }} >
            { isuser ?
                <Stack direction={'row'} spacing={2}>
                <AccountCircle sx={{ color: 'secondary.contrastText' }} />
                <Typography variant='h6' color={'secondary.contrastText'}>Anish Vikende</Typography>
            </Stack>:
            <Typography variant='h6' color={'secondary.contrastText'}>No user Found</Typography>
}
            <Autorenew sx={{ color: 'secondary.contrastText' }} />
        </Stack>
    )
}

export default function AssignVID() {
    return (
        <Box sx={{ backgroundColor: 'secondary.main', p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Stack direction={"column"} spacing={2}>
                        <Stack direction={'column'} spacing={2}>
                            <Typography variant='subtitle2' color={'primary.contrastText'}>phone Number</Typography>
                            <Stack direction={'row'} spacing={2}>
                                <StyledInput placeholder={'Enter Phone number'} />
                                <StyledButton variant={'secondary'} style={{ width: '150px', height: '48px' }} >Verify</StyledButton>
                            </Stack>
                        </Stack>
                        <UserNameComponent isuser={true} />
                        <Stack direction={'column'} sx={{ flexGrow: 1 }} />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack direction={'column'} spacing={2}>
                        <Typography variant='subtitle2' color={'primary.contrastText'}>VID</Typography>
                        <StyledSelectField placeholder={'Choose VID'} />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction={'row'} spacing={2} sx={{justifyContent:'end'}}>
                        <StyledButton variant={'secondary'} style={{width:'100px', height:'48px'}}>Cancel</StyledButton>
                        <StyledButton variant={'primary'} style={{width:'150px', height:'48px'}}>Assign</StyledButton>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}
