import { CalendarMonth } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import { TimeIcon } from '@mui/x-date-pickers'
import React from 'react'
import dayjs from 'dayjs';

export default function UserInfo({data}) {
    const dateMoment = dayjs(data?.createdAt);
    return (
        <Box sx={{ backgroundColor: 'secondary.main', borderRadius: '4px', p: 4 }}>
            <Stack spacing={2}>
                <Stack direction={'row'} spacing={2}>
                    <img style={{ aspectRatio: '1:1', borderRadius: '4px', objectFit: 'cover' }} width='111px' src={data?.img? data?.img : 'https://e7.pngegg.com/pngimages/492/286/png-clipart-computer-icons-user-profile-avatar-avatar-heroes-monochrome-thumbnail.png'} alt='cover'/>
                    <Stack spacing={1} sx={{ p: 2 }}>
                        <Typography variant='h6'>{data?.username}</Typography>
                        <Typography variant='subtitle2'>{data?.mobile}</Typography>
                        <Typography variant='subtitle2'>{data?.email}</Typography>
                    </Stack>
                </Stack>
                <Stack direction={'column'} sx={{ p: {md:0.9,xl:2}, backgroundColor: 'secondary.cardbg', borderRadius: '4px' }}>
                    <Typography variant='subtitle2' sx={{ color: 'secondary.contrastText' }}>Created On :</Typography>
                    <Stack direction={'row'} spacing={2}>
                        <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                            <CalendarMonth sx={{ fontSize: '14px' }} />
                            <Typography variant='subtitle2'>{dateMoment.format('DD MMMM YYYY')}</Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                            <TimeIcon sx={{ fontSize: '14px' }} />
                            <Typography variant='subtitle2'>{dateMoment.format('h:mm a')}</Typography>
                        </Stack>
                    </Stack>
                </Stack>

            </Stack>
        </Box>
    )
}
