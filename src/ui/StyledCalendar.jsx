import * as React from 'react';
import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay, DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Icon, Stack, Typography } from '@mui/material';
import { ReactComponent as Close } from "../assets/icons/close-icon-large.svg";
import StyledDivider from './StyledDivider';
import StyledButton from './StyledButton';

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})(({ theme, isSelected, isHovered, day, startDate, endDate }) => ({
  borderRadius: 0,
  color: '#fff',
  backgroundColor: theme.palette.primary.main,
  ...(isSelected && {
    backgroundColor: '#2D9CDB',
    color: '#fff',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.secondary.button,
    },
  }),
  ...(!isSelected && {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.secondary.button,
    },
  }),
  ...(startDate && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
    backgroundColor: '#2D9CDB'
  }),
  ...(endDate && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
    backgroundColor: '#2D9CDB',
    border: 'none'
  }),
}));

const duration = (day, startDate, endDate) => {
  return (day >= startDate && day <= endDate);
};

function Day(props) {
  const { day, startDate, endDate, ...other } = props;
  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      startDate={dayjs(day).format('DD/MM/YYYY') === dayjs(startDate).format('DD/MM/YYYY')}
      endDate={dayjs(day).format('DD/MM/YYYY') === dayjs(endDate).format('DD/MM/YYYY')}
      isSelected={duration(day, startDate, endDate)}
    />
  );
}

export default function StyledCalendar({ onDateChange,onClose, ...props }) {

  const [startDate, setStartDate] = React.useState(dayjs(new Date().setDate(new Date().getDate() - 6)));
  const [endDate, setEndDate] = React.useState(dayjs(Date()));
  const dateChange = (newValue) => {
    if (newValue > startDate && newValue < endDate) {
      const midDate = new Date((new Date(dayjs(startDate).format('YYYY-MM-DD')).getTime() + new Date(dayjs(endDate).format('YYYY-MM-DD')).getTime()) / 2)
      if (midDate > newValue) {
        setStartDate(newValue)
      } else {
        setEndDate(newValue)
      }
    } else if (newValue >= startDate) {
      setEndDate(newValue)
    } else if (newValue <= startDate) {
      setStartDate(newValue)
    }
  }

  return (
    <Stack direction={'column'} sx={{ backgroundColor: 'primary.main', borderRadius: '4px' }}>
      <Stack direction={'row'} sx={{ justifyContent: 'space-between', px: 2, py: 2, alignItems: 'center' }}>
        <Typography color={'primary.contrastText'} variant='h6'>Calender</Typography>
        <Close style={{cursor:'pointer'}} onClick={()=>{onClose && onClose() }}/>
      </Stack>
      <StyledDivider />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={startDate}
          disableFuture
          disableHighlightToday
          onChange={dateChange}
          showDaysOutsideCurrentMonth
          sx={{ color: '#fff' }}
          slots={{ day: Day }}
          slotProps={{
            day: (ownerState) => ({
              startDate: startDate,
              endDate: endDate
            }),
          }}
        />
      </LocalizationProvider>
      <Stack direction={'row'} sx={{ justifyContent: 'space-between', px: 2, py: 2, alignItems: 'center', backgroundColor: 'secondary.main' }} spacing={2}>
        <StyledButton variant='secondary' style={{ width: '140px', height: '45px' }} onClick={()=>{onClose && onClose() }}>Cancel</StyledButton>
        <StyledButton variant='primary' style={{ width: '140px', height: '45px' }} onClick={()=>{onDateChange && onDateChange({startDate,endDate })}}>Save</StyledButton>
      </Stack>
    </Stack>
  );
}
