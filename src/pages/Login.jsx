import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import StyledDivider from "../ui/styledDivider";
import StyledInput from "../ui/styledInput";
import { MailOutline, Lock, Visibility } from "@mui/icons-material";
import StyledButton from "../ui/styledButton";
import { Controller, useForm } from "react-hook-form";
import { ReactComponent as Close } from "../assets/icons/close-circle.svg";
import { adminLogin } from "../services/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import StyledLoader from "../ui/styledLoader";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotShow, setForgotShow] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setIsSubmit(true);
    try {
      let data = await adminLogin(formData);
      localStorage.setItem("token", data.token);
      toast.success("Login Success");
      setIsSubmit(false);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error("Authentication Failed");
      setIsSubmit(false);
      // reset({},{keepDefaultValues:false});
    }
    setTimeout(() => {}, 2000);
  };

  const handleForgot = (formData) => {
    navigate("/forgot-password");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <Stack
          sx={{ backgroundColor: "secondary.main", borderRadius: "10px" }}
          py={2}
          my={4}
        >
          {!forgotShow && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Logo
                sx={{
                  height: 60,
                  width: 60,
                }}
              />
              <StyledDivider />
            </Box>
          )}
          {!forgotShow ? (
            <Box p={2}>
              <Typography
                sx={{ marginBottom: 1, fontSize: "24px", fontWeight: "600" }}
              >
                Sign In
              </Typography>
              <Typography
                sx={{
                  marginBottom: 4,
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "primary.DimText",
                }}
              >
                Login to your account to continue the process
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  <Controller
                    name="email"
                    control={control}
                    // defaultValue={"riyaskh123@gmail.com"}
                    render={({ field }) => (
                      <>
                        <StyledInput
                          {...field}
                          icon={<MailOutline />}
                          placeholder={"Enter your email"}
                        />
                        {errors.email && (
                          <span style={errorMessageStyle}>
                            {errors.email.message}
                          </span>
                        )}
                      </>
                    )}
                    rules={{ required: "Email is required" }}
                  />
                  <Controller
                    name="password"
                    control={control}
                    // defaultValue={"5p7gePwg6D"}
                    render={({ field }) => (
                      <>
                        <StyledInput
                          {...field}
                          icon={<Lock />}
                          iconright={
                            <Visibility
                              onClick={() => setShowPassword(!showPassword)}
                              style={{ cursor: "pointer" }}
                            />
                          }
                          type={showPassword ? "text" : "password"}
                          placeholder={"Enter your password"}
                        />
                        {errors.email && (
                          <span style={errorMessageStyle}>
                            {errors.password.message}
                          </span>
                        )}
                      </>
                    )}
                    rules={{ required: "Password is required" }}
                  />
                  {isSubmit ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <StyledLoader />
                    </Box>
                  ) : (
                    <StyledButton
                      variant={"primary"}
                      width="100%"
                      type="submit"
                    >
                      Sign in
                    </StyledButton>
                  )}
                  <Typography
                    sx={{
                      marginBottom: 4,
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#2D9CDB",
                      cursor: "pointer",
                    }}
                    onClick={() => setForgotShow(!forgotShow)}
                  >
                    Forgot Your Password?
                  </Typography>
                </Stack>
              </form>
            </Box>
          ) : (
            <Box p={2}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography
                  sx={{ marginBottom: 1, fontSize: "24px", fontWeight: "600" }}
                >
                  Forgot Your Password?
                </Typography>
                <Close
                  onClick={() => setForgotShow(!forgotShow)}
                  style={{ cursor: "pointer" }}
                />
              </Box>
              <Typography
                sx={{
                  marginBottom: 4,
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "primary.DimText",
                }}
              >
                We will send you a reset link
              </Typography>
              <form onSubmit={handleSubmit(handleForgot)}>
                <Stack spacing={4}>
                  <Controller
                    name="remail"
                    control={control}
                    render={({ field }) => (
                      <>
                        <StyledInput
                          {...field}
                          icon={<MailOutline />}
                          placeholder={"Enter your email"}
                        />
                        {errors.remail && (
                          <span style={errorMessageStyle}>
                            {errors.remail.message}
                          </span>
                        )}
                      </>
                    )}
                    rules={{ required: "Email is required" }}
                  />
                  <StyledButton variant={"primary"} width="100%" type="submit">
                    Send
                  </StyledButton>
                </Stack>
              </form>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

const errorMessageStyle = {
  color: "#D25B5B",
};
