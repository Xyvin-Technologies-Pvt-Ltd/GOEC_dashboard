import { Star, CalendarMonth, AccessTime } from '@mui/icons-material'
import { Box, Chip, Grid, Stack, Typography, Button } from '@mui/material'
import React from 'react'
import { formatNepalTime } from '../../../../utils/formatNepalTime'

export default function StationDetail({ data, ...props }) {
  return (
    <Box
      sx={{ p: { xs: 1, md: 5 }, backgroundColor: 'secondary.main', borderRadius: '4px' }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box sx={{ borderRadius: '5px', overflow: "hidden",height:'180px' }}>
            <img src={data.image && `${data.image}`}
              style={{
                objectFit: 'cover',
                height: '100%',
                width: '100%'
              }} />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Stack direction={'column'}>
            <Stack direction={'row'} sx={{ color: '#F2994A', backgroundColor: '#FFFAEA', borderRadius: '15px', width: '50px', justifyContent: 'center' }}>
              <Star fontSize='12px' />
              <Typography fontSize={'12px'}>{data.average_rating && data.average_rating}</Typography>
            </Stack>
            <Stack direction={'column'} spacing={'5px'} sx={{ mt: 2 }}>
              <Typography variant='h6' fontSize={20}>{data.name && data.name}</Typography>
              <Typography variant='subtitle2' sx={{ color: 'secondary.contrastText', fontSize: '12px', fontWeight: '400' }}>{data.address && data.address}</Typography>
              <Stack direction={'row'} spacing={'12px'}>
                  <Chip sx={{ backgroundColor: 'primary.subButton', color: 'primary.contrastText', height: '25px' }} label={data.vendor && data.vendor} />
                  <Chip sx={{ backgroundColor: 'primary.subButton', color: 'primary.contrastText', height: '25px' }} label={data.category && data.category} />
              </Stack>
              <Stack direction={'row'} spacing={1} sx={{ alignItems: 'center' }}>
                <Typography variant='subtitle2' sx={{ color: 'primary.DimText', fontSize: '12px', fontWeight: '400' }}>Commissioned on :</Typography>
                <CalendarMonth sx={{ color: 'secondary.contrastText', fontSize: '15px' }} />
                <Typography variant='subtitle1' sx={{ color: 'secondary.contrastText', fontSize: '12px', fontWeight: '400' }}>{data.commissioned_on ? formatNepalTime(data.commissioned_on, 'DD MMMM YYYY') : '-'}</Typography>
              </Stack>
              <Stack direction={'row'} spacing={1} sx={{ alignItems: 'center' }}>
                <Typography variant='subtitle2' sx={{ color: 'primary.DimText', fontSize: '12px', fontWeight: '400' }}>Operation between :</Typography>
                <AccessTime sx={{ color: 'secondary.contrastText', fontSize: '15px' }} />
                <Typography variant='subtitle1' sx={{ color: 'secondary.contrastText', fontSize: '12px', fontWeight: '400' }}>{data.startTime && data.startTime}</Typography>
                <Typography variant='subtitle2' sx={{ color: 'primary.DimText' }}>to</Typography>
                <AccessTime sx={{ color: 'secondary.contrastText', fontSize: '15px' }} />
                <Typography variant='subtitle1' sx={{ color: 'secondary.contrastText', fontSize: '12px', fontWeight: '400' }}>{data.stopTime && data.stopTime}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Typography variant='caption' color={'primary.DimText'}>Aminities</Typography>
      <Box sx={{ height: '125px', border: '1px solid rgba(255, 255, 255, 0.20)', borderRadius: '4px', p: 1 }}>
        <Grid container spacing={1}>
          {data.amenities && data.amenities.map((item,ind) => (
            <Grid item key={ind}><Button sx={{ backgroundColor: 'primary.subButton', color: 'primary.contrastText', height: '26px', borderRadius: '4px', fontWeight: '5px' }}>{item}</Button></Grid>
          ))
          }
        </Grid>
      </Box>
    </Box>
  )
}
