import React, { useEffect, useState } from "react";
import CommonLayout from "../../../layout/CommonLayout";
import StyledInput from "../../../ui/StyledInput";
import { FormControlLabel, Grid, Switch, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CalendarInput from "../../../ui/CalendarInput";
import StyledFooter from "../../../ui/StyledFooter";
import StyledButton from "../../../ui/StyledButton";
import StyledSwitch from "../../../ui/StyledSwitch";
import { useForm, Controller } from "react-hook-form"

const EditVidCards = ({existingData,Close,Save}) => {
  const isOnline = existingData['Status'] === 'online';
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: {
      vidTag: existingData['VID Tag'],
      serialno: '1244235786',
      expiryDate: existingData['Expires On'],
      activate: isOnline,
    },
  });

  const onSubmit = (data) => {
    // Handle form submission with data
    // Close your form or perform other actions
    Close();
  };

  const handleDateChangeInParent = (date) => {
    setValue('expiryDate', date); // Assuming you have 'expiryDate' in your form state
    clearErrors('expiryDate');
  };
  const expiryDate = watch('expiryDate', existingData['Expires On']); // Watching the value for 'expiryDate'
  
  const handleChange = (event) => {
    setValue('activate',event.target.checked);
  };


  // Inside EditVidCard component
  useEffect(() => {
  }, [existingData]);

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <CommonLayout header="Edit VID Tag"  onClick={Close}>
        <Typography align="left">VID </Typography>
        <Controller
          name="vidTag"
          control={control}
          render={({ field }) => (
            <>
              <StyledInput {...field} placeholder="Enter VID Tag" />
              {errors.vidTag && <span style={errorMessageStyle}>{errors.vidTag.message}</span>}
            </>
          )}
          // Adding 'required' attribute here
          rules={{ required: 'VID tag is required' }}
        />

        <Typography align="left">Serial number</Typography>
        <Controller
          name="serialno"
          control={control}
          render={({ field }) => (
            <>
              <StyledInput {...field} placeholder="Enter Serial number" />
              {errors.serialno && <span style={errorMessageStyle}>{errors.serialno.message}</span>}
            </>
          )}
          rules={{ required: 'Serial number is required' }}
        />

        <Typography align="left">VID Expiry date</Typography>
        <Controller
          name="expiryDate"
          control={control}
          render={({ field }) => (
            <>
              <StyledInput
                {...field}
                placeholder="Enter VID Expiry date"
                iconright={<CalendarInput dateValue={expiryDate} onDateChange={handleDateChangeInParent} />}
                value={expiryDate}
                readOnly

              />
              {errors.expiryDate && <span style={errorMessageStyle}>{errors.expiryDate.message}</span>}
            </>
          )}
          // Adding 'required' attribute here
          rules={{ required: 'VID Expiry date is required' }}
        />

        <Grid container spacing={2} direction="row">
          <Grid item xs={6}>
            <Typography align="left">Activate VID</Typography>
          </Grid>
          <Grid item xs={6} textAlign={"right"} justifyContent={"flex-end"} display={"flex"}>
          <Controller
              name="activate"
              control={control}
              render={({ field }) => (

                <StyledSwitch
                  {...field}
                  onChange={(e) => {
                    handleChange(e);
                    // Additional logic if needed
                  }}
                  defaultChecked={field.value}
                // Adding 'required' attribute
                />
              )}
            />
          </Grid>
         </Grid>
      </CommonLayout>
      <StyledFooter>
        <StyledButton variant="secondary" width="103" mr="20" onClick={Close}>
          Cancel
        </StyledButton>
        <StyledButton variant="primary" width="160" type="submit">
          Save
        </StyledButton>
      </StyledFooter>
      </form>
    </>
  )
}
const errorMessageStyle = {
  color: 'red',
  // margin: '1px 0',
};
export default EditVidCards
