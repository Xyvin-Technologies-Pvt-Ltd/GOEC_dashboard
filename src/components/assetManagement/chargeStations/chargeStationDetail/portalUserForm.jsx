import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { Email, Person, Phone } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import StyledInput from "../../../../ui/styledInput";
import StyledButton from "../../../../ui/styledButton";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function FieldError({ error }) {
  if (!error) return null;
  return (
    <Typography sx={{ color: "#ff6b6b", fontSize: 12, mt: 0.5 }}>{error.message}</Typography>
  );
}

// Create/edit form for a station's portal user. On create the station owner's contact
// details are prefilled; the backend generates and emails the temporary password.
export default function PortalUserForm({ defaultValues, isEdit, isSaving, onSubmit, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const submit = (formData) =>
    onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim(),
      mobile: (formData.mobile || "").trim(),
    });

  return (
    <form onSubmit={handleSubmit(submit)} style={{ width: "min(460px, 80vw)" }}>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Typography sx={{ mb: 1 }}>Name</Typography>
          <StyledInput
            icon={<Person />}
            placeholder="Enter name"
            {...register("name", { required: "Name is required", maxLength: { value: 100, message: "Name is too long" } })}
          />
          <FieldError error={errors.name} />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ mb: 1 }}>Email (used to sign in)</Typography>
          <StyledInput
            icon={<Email />}
            placeholder="Enter email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: EMAIL_PATTERN, message: "Enter a valid email" },
            })}
          />
          <FieldError error={errors.email} />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ mb: 1 }}>Mobile number</Typography>
          <StyledInput
            icon={<Phone />}
            placeholder="Enter mobile number"
            inputMode="tel"
            {...register("mobile", {
              pattern: { value: /^\+?[0-9\s-]{7,20}$/, message: "Enter a valid mobile number" },
            })}
          />
          <FieldError error={errors.mobile} />
        </Grid>
        {!isEdit && (
          <Grid item xs={12}>
            <Typography sx={{ color: "primary.DimText", fontSize: 12 }}>
              A temporary password will be emailed to this address. The user must set a new password on first sign-in.
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <StyledButton type="button" variant="secondary" width="103" onClick={onClose}>
              Cancel
            </StyledButton>
            <StyledButton type="submit" variant="primary" width="160" disabled={isSaving}>
              {isSaving ? "Saving..." : isEdit ? "Save" : "Create user"}
            </StyledButton>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
