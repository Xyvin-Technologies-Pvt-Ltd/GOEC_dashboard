import React, { useEffect, useState } from 'react'
import StyledInput from './StyledInput'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ReactComponent as CalendarIcon } from '../assets/icons/calendar_month.svg'
import { format } from 'date-fns';

function convertDateFormat(inputDate) {
  // Parse the input date string in the format "30-12-2023"
  const parts = inputDate.split('-');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Months are zero-based
  const year = parseInt(parts[2], 10);

  // Create a Date object
  const dateObject = new Date(year, month, day);

  // Format the Date object to the desired string
  const formattedDate = dateObject.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  });

  return formattedDate;
}

const CalendarInput = ({dateValue,onDateChange }) => {

  const cal_date=dateValue ? new Date(convertDateFormat(dateValue)) : new Date()
  const [selectedDate, setSelectedDate] = useState(cal_date);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);

 
  const handleCalendarClick = () => {

      setDatePickerOpen(!isDatePickerOpen);
  };

  const handleDateChange = (date) => {

    if (date instanceof Date && !isNaN(date)) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      if (onDateChange) {
        onDateChange(formattedDate);
      }
      const updateDate = convertDateFormat(formattedDate);
      const new_date=new Date(updateDate)
  
      setSelectedDate(new_date);
      //setSelectedDate(date);
      setDatePickerOpen(false);

      



    } else {
      console.error("Invalid date object:", date);
    }

  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <CalendarIcon onClick={handleCalendarClick}  style={{ cursor: 'pointer', zIndex: 1 }}  />
      {isDatePickerOpen && (
        <div style={{ position: 'absolute', zIndex: 2 }}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd-MM-yyyy"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            popperPlacement="bottom-start"
            open
            onClickOutside={() => setDatePickerOpen(false)} // Close calendar on outside click
             // Use CustomInput prop for a simplified input
             customInput={<StyledInput value={dateValue || ''} readOnly />}
          />
        </div>
      )}
    </div>
  )
}


export default CalendarInput
