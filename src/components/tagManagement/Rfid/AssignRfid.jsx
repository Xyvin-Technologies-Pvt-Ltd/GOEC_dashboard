import styled from "styled-components";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import StyledSelectField from "../../../ui/styledSelectField";
import StyledButton from "../../../ui/styledButton";
import { ReactComponent as UserIcon } from "../../../assets/icons/Frame 42744.svg";
import { ReactComponent as Refresh } from "../../../assets/icons/autorenew.svg";
import StyledFooter from "../../../ui/StyledFooter";
import StyledPhoneNumber from "../../../ui/StyledPhoneNumber";
import StyledList from "../../../ui/StyledList";
import LastSynced from "../../../layout/LastSynced";
import { useForm, Controller } from "react-hook-form";
import StyledInput from "../../../ui/styledInput";
import { useAddRfidTag, useRemoveRfidTag } from "../../../hooks/mutations/useUserMutation";
import { useUserByEmailMobile } from "../../../hooks/queries/useUser";
import { useRfidUnassignedList } from "../../../hooks/queries/useRfid";
import { toast } from "react-toastify";
import StyledDivider from "../../../ui/styledDivider";

const typeOption = [
  { value: "personal", label: "Personal" },
  { value: "work", label: "Work" },
  { value: "other", label: "Other" },
];

const AssingedCard = ({ data, unassign }) => {
  return (
    <Box
      justifyContent="center"
      sx={{ bgcolor: "#39383D", paddingBottom: "10px" }}
    >
      <List sx={{ width: "100%", pt: 0 }}>
        <ListItem sx={{ pb: 0 }}>
          <ListItemText primary={"RFID Tag"} secondary={data && data.rfidTag} />
        </ListItem>
        <StyledDivider />
        <ListItem sx={{ pb: 0 }}>
          <ListItemText
            primary={"RFID Serial No."}
            secondary={data && data.serialNumber}
          />
        </ListItem>
        <StyledDivider />
        <ListItem sx={{ pb: 0 }}>
          <ListItemText
            primary={"RFID Type"}
            secondary={data && data.rfidType}
          />
        </ListItem>
        <StyledDivider />
      </List>
      <Box justifyContent="center" display="flex">
        <StyledButton
          variant="primary"
          width="90"
          height="27"
          type="button"
          onClick={unassign && unassign}
        >
          Unassign
        </StyledButton>
      </Box>
    </Box>
  );
};

const AssignRfid = () => {
  const [userInfo, setUserInfo] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
    setValue,
    getValues,
  } = useForm();

  // TanStack Query hooks
  const { data: rfidUnassignedData, refetch: refetchUnassignedRfids } = useRfidUnassignedList();
  const { refetch: fetchUserByPhone } = useUserByEmailMobile(
    `phoneNumber=${phoneNumber}`,
    false // lazy loading
  );

  const { mutate: assignRfidTag, isPending: isAssigning } = useAddRfidTag({
    onSuccess: () => {
      toast.success("Successfully Assigned");
      userFetchButtonHandle();
      refetchUnassignedRfids();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to assign RFID");
    },
  });

  const { mutate: unassignRfidTag, isPending: isUnassigning } = useRemoveRfidTag({
    onSuccess: () => {
      toast.success("Successfully unassigned");
      userFetchButtonHandle();
      refetchUnassignedRfids();
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to unassign RFID");
    },
  });

  // Extract data with safe defaults
  const rfidOption = rfidUnassignedData?.result?.map((dt) => ({ label: dt.rfidTag, value: dt._id })) || [];

  const onSubmit = (data) => {
    // Handle form submission here
    if (!userInfo) {
      toast.error("user not found");
      return;
    }
    const dt = {
      rfidTagId: data.rfid.value,
      rfidType: data.type.value,
    };
    assignRfidTag({ id: userInfo._id, data: dt });
  };

  const clearForm = () => {
    reset(); // This will clear the form
  };

  const unAssignHandle = (dt) => {
    const req = {
      rfidTagId: dt._id,
    };
    unassignRfidTag({ id: userInfo._id, data: req });
  };

  const userFetchButtonHandle = () => {
    const mobile = userInfo
      ? userInfo.mobile
      : getValues().phoneNumber && getValues().phoneNumber;
    if (mobile.length > 9) {
      setPhoneNumber(getValues().phoneNumber);
      fetchUserByPhone().then((res) => {
        if (res.data?.success) {
          setUserInfo(res.data.result[0]);
        } else {
          toast.error("User not found");
          setUserInfo();
        }
      }).catch((err) => {
        toast.error(err.response?.data?.error || "Failed to fetch user");
        setUserInfo();
      });
    } else {
      toast.error("please enter valid mobile number");
    }
  };

  return (
    <>
      <LastSynced heading="RFID Cards" lastSyncVisible={false} />
      <TableContainer>
        <Container maxWidth="lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs={12} md={6}>
                  <Grid item xs={12} md={12}>
                    <Typography sx={{ mt: 3, mb: 1 }}>Type</Typography>
                    <Stack direction="column">
                      {/* <StyledSelectField placeholder={"Personal"} options={options} /> */}
                      <Controller
                        name="type" // This should match the name of your field
                        control={control}
                        render={({ field }) => (
                          <>
                            <StyledSelectField
                              {...field}
                              placeholder="Choose Type"
                              options={typeOption}
                            />
                            {errors.type && (
                              <span style={errorMessageStyle}>
                                {errors.type.message}
                              </span>
                            )}
                          </>
                        )}
                        rules={{ required: "Type is required" }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography sx={{ mt: 1, mb: 1 }}>Phone number</Typography>
                    <Grid container spacing={2} xs={12} md={12}>
                      <Grid item xs={9}>
                        <Controller
                          name="phoneNumber" // This should match the name of your field
                          control={control}
                          //defaultValue={{ countryCode: '', phoneNumber: '' }}
                          render={({ field }) => (
                            <>
                              <StyledInput
                                style={{
                                  height: "55px",
                                }}
                                {...field}
                                type="number"
                                placeholder="Enter Phone number"
                                onChange={(e) => {
                                  // Update the form state with the combined value
                                  setValue("phoneNumber", e.target.value);
                                }}
                              />
                              {errors.phoneNumber && (
                                <span style={errorMessageStyle}>
                                  {errors.phoneNumber.message}
                                </span>
                              )}
                            </>
                          )}
                          rules={{ required: "Phone number is required" }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <StyledButton
                          variant="gray"
                          width="100%"
                          height="56"
                          type="button"
                          onClick={userFetchButtonHandle}
                        >
                          Verify
                        </StyledButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ mt: 3 }}>
                    <StyledInput
                      placeholder="Enter Name"
                      icon={<UserIcon />}
                      iconright={<Refresh />}
                      disabled
                      value={userInfo && userInfo.username}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ paddingLeft: { xs: 0, md: "30px" } }}
                >
                  <Grid item xs={12} md={12}>
                    <Typography sx={{ mt: 3, mb: 1 }}>RFID</Typography>
                    <Stack direction="column">
                      <Controller
                        name="rfid" // This should match the name of your field
                        control={control}
                        render={({ field }) => (
                          <>
                            <StyledSelectField
                              {...field}
                              placeholder="Choose RFID"
                              options={rfidOption}
                            />
                            {errors.rfid && (
                              <span style={errorMessageStyle}>
                                {errors.rfid.message}
                              </span>
                            )}
                          </>
                        )}
                        rules={{ required: "RFID is required" }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm container spacing={1}>
                    <Grid item xs={12} md={12}>
                      <Typography sx={{ mt: 3, mb: 1 }}>
                        Assigned RFID
                      </Typography>
                    </Grid>
                    {userInfo &&
                      userInfo.rfidDetails.map((dt) => (
                        <Grid item xs={6} md={6}>
                          <AssingedCard
                            data={dt}
                            unassign={() => {
                              unAssignHandle(dt);
                            }}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} sx={{ mt: 4 }}>
                <StyledFooter width="100">
                  <StyledButton
                    variant={"gray"}
                    width="103"
                    mr="20"
                    type="button"
                    onClick={clearForm}
                  >
                    {" "}
                    Cancel{" "}
                  </StyledButton>
                  <StyledButton
                    variant={"primary"}
                    width="160"
                    type="submit"
                    disabled={isAssigning}
                  >
                    {" "}
                    {isAssigning ? "Assigning..." : "Assign"}{" "}
                  </StyledButton>
                </StyledFooter>
              </Grid>
            </Grid>
          </form>
        </Container>
      </TableContainer>
    </>
  );
};
const errorMessageStyle = {
  color: "red",
  margin: "10px 0",
};

export default AssignRfid;

//! STYLINGS

// Styled action cell

// Styled table container
export const TableContainer = styled.div`
  background: #1c1d22; // Dark background for the table
  overflow-x: auto; // Allows table to be scrollable horizontally
  border-radius: 8px; // Rounded corners
  margin: 20px 16px; // Margin for spacing, adjust as needed
`;
