import {
    Box,
    ButtonBase,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputField from "../../../ui/StyledInput";
import StyledSelectField from "../../../ui/StyledSelectField";
import StyledButton from "../../../ui/StyledButton";
import { ReactComponent as UserIcon } from '../../../assets/icons/Frame 42744.svg'
import { ReactComponent as Refresh } from '../../../assets/icons/autorenew.svg'
import StyledFooter from "../../../ui/StyledFooter";
import StyledPhoneNumber from "../../../ui/StyledPhoneNumber";
import StyledList from "../../../ui/StyledList";
import LastSynced from '../../../layout/LastSynced'
import StyledDropdown from "../../../ui/StyledDropdown";
import { useForm, Controller } from 'react-hook-form';
import StyledInput from "../../../ui/StyledInput";
import { TableContainer } from "../../common/FilterPrimitives";

const listdata = [
    { title: 'VID Tag', value: '04238ECAF10F90' },
    { title: 'VID Serial No.', value: '04238ECAF10F90' },
    { title: 'VID Type', value: 'Personal' },
];

const AssignVid = () => {

    const { control, handleSubmit, reset, formState: { errors }, clearErrors } = useForm();

    const onSubmit = (data) => {
        // Handle form submission here

        // Clear the form after successful submission
        reset();
    };

    const options = [
        { value: 'personal', label: 'Personal' },
        { value: 'work', label: 'Work' },
        { value: 'other', label: 'Other' },
        // Add more options as needed
    ];

    const vidoptions = [
        { value: '23202911', label: '23202911' },
        { value: '23202912', label: '23202912' },
        { value: '23202913', label: '23202913' },
        // Add more options as needed
    ];

    useEffect(() => {
      
        // Reset the form
        reset();
      }, [reset]);


    return (
        <>
            <LastSynced heading="VID Cards" />
            <TableContainer className="mx-4 my-5 bg-[#1c1d22]">
                <Container maxWidth="lg">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container>
                            <Grid item xs={12} sm container >
                                <Grid item xs={12} md={6}>
                                    <Grid item xs={12} md={12}>
                                        <Typography sx={{ mt: 3, mb: 1 }}>Type</Typography>
                                        <Stack direction="column">
                                            <Controller
                                                name="type" // This should match the name of your field
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                        <StyledSelectField
                                                            {...field}
                                                            placeholder="Choose Type"
                                                            options={options}

                                                        />
                                                        {errors.type && <span style={errorMessageStyle}>{errors.type.message}</span>}
                                                    </>
                                                )}
                                                rules={{ required: 'Type is required' }}
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Typography sx={{ mt: 1, mb: 1 }}>Phone number</Typography>
                                        <Grid container spacing={2} item xs={12} md={12}>
                                            <Grid item xs={12} md={9}>
                                                {/* <InputField placeholder={"Enter Phone number"} /> */}
                                                <Controller
                                                    name="phoneNumber" // This should match the name of your field
                                                    control={control}
                                                    //defaultValue={{ countryCode: '', phoneNumber: '' }}
                                                    render={({ field }) => (
                                                        <>
                                                            <StyledPhoneNumber
                                                                placeholder="Enter Phone number"
                                                                onChange={(value) => {
                                                                    // Update the form state with the combined value
                                                                    field.onChange(value);
                                                                }}
                                                            />
                                                            {errors.phoneNumber && <span style={errorMessageStyle}>{errors.phoneNumber.message}</span>}
                                                        </>
                                                    )}
                                                    rules={{ required: 'Phone number is required' }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <StyledButton variant='gray' width='121' height='56'>Verify</StyledButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12} sx={{ mt: 3 }}>
                                        <Stack direction="column">
                                            <Controller
                                                name="username"
                                                control={control}
                                                render={({ field }) => (
                                                <>
                                                    <StyledInput
                                                    {...field}
                                                    placeholder="Enter Name"
                                                    icon={<UserIcon />} iconright={<Refresh />}
                                                    
                                                    />
                                                    {errors.username && <span style={errorMessageStyle}>{errors.username.message}</span>}
                                                </>
                                                )}
                                                // Adding 'required' attribute here
                                                rules={{ required: 'Name is required' }}
                                            />
                                        </Stack>
                                    </Grid>

                                </Grid>
                                <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: 0, md: '30px' } }}>

                                    <Grid item xs={12} md={12}>
                                        <Typography sx={{ mt: 3, mb: 1 }}>VID</Typography>
                                        <Stack direction="column">
                                            <Controller
                                                name="vid" // This should match the name of your field
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                <StyledSelectField 
                                                {...field}
                                                    placeholder="Choose VID" 
                                                    options={vidoptions} 
                                                
                                                />
                                                {errors.vid && <span style={errorMessageStyle}>{errors.vid.message}</span>}
                                                </>
                                                )}
                                                rules={{ required: 'VID is required' }}
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} sm container spacing={1}>
                                        <Grid item xs={12} md={12}>
                                            <Typography sx={{ mt: 3, mb: 1 }}>Assigned VID</Typography>
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                            <Box justifyContent="center" sx={{ bgcolor: '#39383D', paddingBottom: '10px' }}>
                                                <StyledList data={listdata} />
                                                <Box justifyContent="center" display="flex">
                                                    <StyledButton variant='primary' width='90' height='27'>Unassign</StyledButton>
                                                </Box>

                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} md={6} >
                                            <Box justifyContent="center" sx={{ bgcolor: '#39383D', paddingBottom: '10px' }}>
                                                <StyledList data={listdata} />
                                                <Box justifyContent="center" display="flex">
                                                    <StyledButton variant='primary' width='90' height='27'>Unassign</StyledButton>
                                                </Box>

                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} sx={{ mt: 4 }}>
                                <StyledFooter width='100' sx={{ paddingRight: '0px' }}>
                                    <StyledButton variant={"gray"} width="103" mr="20" > Cancel </StyledButton>

                                    <StyledButton variant={"primary"} width="160" type="submit"> Assign </StyledButton>
                                </StyledFooter>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </TableContainer>
        </>
    )
}
const errorMessageStyle = {
    color: 'red',
    margin: '10px 0',
  };

export default AssignVid;
