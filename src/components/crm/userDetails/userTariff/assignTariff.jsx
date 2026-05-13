import { Box, Dialog, Stack, Typography } from '@mui/material'
import React from 'react'
import StyledInput from '../../../../ui/StyledInput'
import StyledWarning from '../../../../ui/StyledWarning'
import { ReactComponent as Close } from "../../../../assets/icons/close-icon-large.svg";
import { AccountCircle, Autorenew, ErrorOutlineOutlined, Phone, WarehouseOutlined, Warning } from '@mui/icons-material'
import StyledDivider from '../../../../ui/StyledDivider';
import StyledButton from '../../../../ui/StyledButton';
import StyledSelectField from '../../../../ui/StyledSelectField';
import { useForm, Controller } from "react-hook-form";
import { Transition } from '../../../../ui/DialogAnimation';


const UserNameComponent = ({ isuser = false }) => {
    return (
        <Stack direction={'row'} sx={{ p: 2, justifyContent: 'space-between', backgroundColor: 'secondary.lightGray', borderRadius: '4px', border: '1px solid #fff3' }} >
            {isuser ?
                <Stack direction={'row'} spacing={2}>
                    <AccountCircle sx={{ color: 'secondary.contrastText' }} />
                    <Typography variant='h6' color={'secondary.contrastText'}>Anish Vikende</Typography>
                </Stack> :
                <Typography variant='h6' color={'secondary.contrastText'}>No user Found</Typography>
            }
            <Autorenew sx={{ color: 'secondary.contrastText' }} />
        </Stack>
    )
}


export default function AssignTariff({ open, onClose, ...props }) {


    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        clearErrors,
      } = useForm({
        defaultValues: {
          published: false, // Set the default value for "activate"
        },
      });
      const onSubmit = (data) => {
        // Handle form submission with data
        // Close your form or perform other actions
      };
    
    return (
        <Dialog open={open} maxWidth={'sm'} fullWidth onClose={onClose && onClose} TransitionComponent={Transition}>
            <Box sx={{ backgroundColor: 'secondary.main' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack sx={{ p: 4 }} spacing={1}>
                    <Stack direction={'column'} spacing={2} >
                        <Typography variant='subtitle2' sx={{ color: 'secondary.contrastText' }}>Person</Typography>
                       
                        <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <>
                     <StyledInput placeholder={'Enter Person Phone number'} value={250} />
                    {errors.phoneNumber && (
        
                         <StyledWarning icon={<ErrorOutlineOutlined sx={{ color: 'error.main' }} />} value={errors.phoneNumber.message}  />
                    )}
                  </>
                )}
                rules={{ required: "Please enter the Phone number" }}
               
              />
              
                    </Stack>

                    <UserNameComponent isuser={true} />

                    <Stack direction={'column'} spacing={2} >

                        <Typography variant='subtitle2' sx={{ color: 'secondary.contrastText' }}>Charger Location </Typography>
                    <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <>
                        <StyledSelectField placeholder={'Select Location'} />
                    {errors.location && (
                         <StyledWarning icon={<ErrorOutlineOutlined sx={{ color: 'error.main' }} />} value=  {errors.location.message} />
                      
                    )}
                  </>
                )}
                rules={{ required: "Please Select Location" }}
               
              />
              
                   
                    </Stack>

                    <Stack direction={'column'} spacing={2} >
                        <Typography variant='subtitle2' sx={{ color: 'secondary.contrastText' }}>CPID </Typography>


                        <Controller
                name="cpid"
                control={control}
                render={({ field }) => (
                  <>
                       <StyledSelectField placeholder={'Select CPID'} />
                    {errors.cpid && (
                         <StyledWarning icon={<ErrorOutlineOutlined sx={{ color: 'error.main' }} />} value=  {errors.cpid.message} />
                      
                    )}
                  </>
                )}
                rules={{ required: "Please enter the cpid" }}
               
              />
                     
                    </Stack>

                </Stack>
                <Stack direction={'row'} sx={{ backgroundColor: 'secondary.main', px: 3, py: 2 }} spacing={2} justifyContent={'center'}>
                    <StyledButton variant={'secondary'} style={{ width: '130px', height: '48px' }} onClick={() => { onClose && onClose() }}>Cancel</StyledButton>
                    <StyledButton variant={'primary'} style={{ width: '180px', height: '48px' }} type="submit">Assign</StyledButton>
                </Stack>
            </form>
            </Box>
        </Dialog>
    )
}
