import { Grid, Typography, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StyledSelectField from "../../../ui/styledSelectField";
import StyledButton from "../../../ui/styledButton";
import InputField from "../../../ui/styledInput";
import StyledPhoneNumber from "../../../ui/StyledPhoneNumber";
import StyledSwitch from "../../../ui/styledSwitch";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../../../ui/styledInput";
import { Phone, Try } from "@mui/icons-material";
import { useRolesList } from "../../../hooks/queries/useUser";
import { useCreateAdmin, useUpdateAdmin } from "../../../hooks/mutations/useUserMutation";
import { toast } from "react-toastify";

export default function AddAdmin({ setIsChange, isChange, setAction, action, data,onClose, ...props }) {

  const formOptions =
    action === "edit"
      ? {
          defaultValues: {
            name: data.Name,
            designation: data.Designation,
            email: data.Email,
            mobile: data.Phone,
            role: data.Role,
            status: data.Status === "Active" ? true : false,
          },
        }
      : {};

  const { register, handleSubmit, control, reset } = useForm(formOptions);
  const { data: rolesData, isLoading: rolesLoading } = useRolesList();
  const createAdminMutation = useCreateAdmin({
    onSuccess: () => {
      props.onSuccess();
      setIsChange(!isChange);
    },
    onError: () => {
      toast.error("Failed to add admin");
    },
  });
  const updateAdminMutation = useUpdateAdmin({
    onSuccess: () => {
      props.onSuccess();
      setIsChange(!isChange);
      setAction("add");
      reset();
    },
    onError: () => {
      toast.error("Failed to update admin");
    },
  });

  const [loading, setLoading] = useState(false);
  const onSubmit = async (formData) => {
    setLoading(true);
    let fData = { ...formData, role: formData.role.value };
    if (action === "add") {
      createAdminMutation.mutate(fData, {
        onSettled: () => setLoading(false),
      });
    } else if (action === "edit") {
      updateAdminMutation.mutate({ id: data._id, data: fData }, {
        onSettled: () => setLoading(false),
      });
    }
  };

  // No need for useEffect/init, roles are fetched via hook

  return (
    <TableContainer>
      <Container fixed>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item md={12}>
              <Typography sx={{ marginBottom: 1 }}>Name</Typography>
              <InputField placeholder={"Enter Admin Name"} {...register("name")} />
            </Grid>
            <Grid item md={12}>
              <Typography sx={{ marginBottom: 1 }}>Designation</Typography>
              <InputField placeholder={"Enter Designation"} {...register("designation")} />
            </Grid>
            <Grid item md={12}>
              <Typography sx={{ marginBottom: 1 }}>Email</Typography>
              <InputField placeholder={"Enter Email"} {...register("email")} />
            </Grid>
            <Grid item md={12}>
              <Typography sx={{ marginBottom: 1 }}>Mobile number</Typography>
              <Controller
                name="mobile"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledInput
                      {...field}
                      icon={<Phone />}
                      placeholder={"Enter Phone number"}
                      type="number"
                    />
                  </>
                )}
                rules={{ required: "Phone number is required" }}
              />{" "}
            </Grid>
            <Grid item md={12}>
              <Typography sx={{ marginBottom: 1 }}>Role name</Typography>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledSelectField
                      {...field}
                      placeholder="Role"
                      options={
                        rolesData?.result?.map((e) => ({
                          label: e.roleName,
                          value: e._id,
                        })) || []
                      }
                      loading={rolesLoading}
                    />
                  </>
                )}
                rules={{ required: "Role is required" }}
              />
            </Grid>
            <Grid sx={{ marginBottom: 1, marginTop: 3 }} item xs={12} md={12}>
              <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                <Typography>Activate Admin status</Typography>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <StyledSwitch
                      {...field}
                      defaultChecked={field.value}
                      // Adding 'required' attribute
                    />
                  )}
                />
              </Stack>
            </Grid>
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
              <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
                <StyledButton type="button" variant={"secondary"} width="103" onClick={onClose}>
                  Cancel
                </StyledButton>
                <StyledButton variant={"primary"} width="160" type="submit"
                  disabled={loading || createAdminMutation.isLoading || updateAdminMutation.isLoading}>
                   {(loading || createAdminMutation.isLoading || updateAdminMutation.isLoading) ? "Saving..." : "Save"}
                </StyledButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Container>
    </TableContainer>
  );
}

//! STYLINGS

// Styled table container
export const TableContainer = styled.div`
  background: #27292f; // Dark background for the table
  overflow-x: auto; // Allows table to be scrollable horizontally
  border-radius: 8px; // Rounded corners
  max-width: 500px;
`;
