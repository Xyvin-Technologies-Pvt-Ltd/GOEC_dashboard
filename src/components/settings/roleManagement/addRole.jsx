import { Grid, Typography, Container, Stack, Box, Switch, FormControlLabel } from "@mui/material";
import styled from "styled-components";
import StyledButton from "../../../ui/styledButton";
import InputField from "../../../ui/styledInput";
import StyledTab from "../../../ui/styledTab";
import LocationalAccess from "./locationalAccess";
import FunctionalAccess from "./functionalAccess";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useCreateRole, useUpdateRole } from "../../../hooks/mutations/useUserMutation";
import { toast } from "react-toastify";
import { PinkSwitch } from "../../../ui/PinkSwitch";
import { useEffect } from "react";

export default function AddRole({ setIsChange, isChange, action, data,onClose, ...props }) {
  const methods = useForm({
    defaultValues: {
      togglePage: 0,
      roleName: action === "edit" ? data["Role name"] : "",
      roleDescription: action === "edit" ? data["Role Description"] : "",
      functionalPermissions: [],
      locationalPermissions: action === "edit" ? data["locationAccess"] : [],
      isActive: action === "edit" ? data.Status === "Active" : true,
    },
  });
  

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = methods;

  const createRoleMutation = useCreateRole({
    onSuccess: () => {
      setIsChange(!isChange);
      props.onSuccess();
    },
    onError: () => {
      toast.error("Failed to add role");
    },
  });
  const updateRoleMutation = useUpdateRole({
    onSuccess: () => {
      setIsChange(!isChange);
      props.onSuccess();
    },
    onError: () => {
      toast.error("Failed to update role");
    },
  });

  const onSubmit = (Formdata) => {
    let dt = {
      functionalPermissions: Formdata.functionalPermissions,
      isActive: Formdata.isActive,
      roleName: Formdata.roleName,
      roleDescription: Formdata.roleDescription,
      togglePage: Formdata.togglePage,
      locationalPermissions: Formdata.locationalPermissions.map((d)=>{return d.value ? d : {value:d}})
    };
    if (action === "add") {
      createRoleMutation.mutate(dt);
    } else if (action === "edit") {
      updateRoleMutation.mutate({ id: data._id, data: dt });
    }
  };
  const buttonChanged = (e) => {
    setValue("togglePage", e.index);
  };

  return (
    <TableContainer>
      <FormProvider {...methods}>
        <Container fixed>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item md={12}>
                <Typography sx={{ marginBottom: 1 }}>Role name</Typography>
                <Controller
                  name="roleName"
                  render={({ field }) => (
                    <InputField
                      placeholder="Enter Role name"
                      {...field}
                      error={!!errors.roleName}
                      helperText={errors.roleName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item md={12}>
                <Typography sx={{ marginBottom: 1 }}>Role Description</Typography>
                <Controller
                  name="roleDescription"
                  render={({ field }) => (
                    <InputField
                      placeholder="Enter Description"
                      {...field}
                      error={!!errors.roleDescription}
                      helperText={errors.roleDescription?.message}
                    />
                  )}
                />
              </Grid>

              {/* Active status  */}
              <Grid item md={12}>
                <Typography sx={{ marginBottom: 1 }}>Active Status</Typography>
                <Controller
                  name="isActive"
                  control={methods.control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <PinkSwitch
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          name="isActive"
                        />
                      }
                      label={field.value ? "Active" : "Inactive"}
                    />
                  )}
                />
              </Grid>
              {/* Tabs for Functional and Locational Access */}
              <Box pl={4} pt={3} sx={{ width: "100%" }}>
                <StyledTab
                  buttons={["Functional Access", "Locational Access"]}
                  onChanged={buttonChanged}
                />
                {watch("togglePage") === 0 && <FunctionalAccess datas={data && data.permissions} isUpdate={action === "edit"} />}
                {watch("togglePage") === 1 && <LocationalAccess datas={data && data.locationAccess} isUpdate={action === "edit"} />}
              </Box>

              {/* Save and Cancel Buttons */}
              <Grid
                item
                xs={12}
                md={12}
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <Stack direction={"row"} spacing={2} sx={{ mt: 1 }}>
                  <StyledButton variant={"secondary"} width="103" type="button" onClick={onClose}>
                    Cancel
                  </StyledButton>
                  <StyledButton variant={"primary"} width="160">
                    Save
                  </StyledButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Container>
      </FormProvider>
    </TableContainer>
  );
}

//! STYLINGS

// Styled table container
export const TableContainer = styled.div`
  background: #27292f; // Dark background for the table
  overflow-x: auto; // Allows table to be scrollable horizontally
  border-radius: 8px; // Rounded corners
`;
