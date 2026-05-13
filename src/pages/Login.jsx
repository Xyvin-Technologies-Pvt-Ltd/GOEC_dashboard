import React, { useState } from "react";
import StyledDivider from "../ui/StyledDivider";
import StyledInput from "../ui/StyledInput";
import { MailOutline, Lock, Visibility } from "@mui/icons-material";
import StyledButton from "../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import { ReactComponent as Close } from "../assets/icons/close-circle.svg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import StyledLoader from "../ui/StyledLoader";
import HeaderLogo from "../assets/header-logo.png";
import { useAuthStore } from "../store";

const errorMessageClass = "text-sm text-[#D25B5B]";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotShow, setForgotShow] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remail: "",
    },
  });

  const onSubmit = async (formData) => {
    try {
      await login(formData);
      toast.success("Login Success");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.message || "Authentication Failed");
    }
  };

  const handleForgot = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="my-8 rounded-[10px] bg-[#1c1d22] py-2">
          {!forgotShow && (
            <div className="flex flex-col items-center justify-center">
              <img src={HeaderLogo} alt="Logo" className="w-1/5" />
              <StyledDivider />
            </div>
          )}
          {!forgotShow ? (
            <div className="p-4">
              <h1 className="mb-1 text-2xl font-semibold text-foreground">Sign In</h1>
              <p className="mb-8 text-sm font-normal text-[#828282]">
                Login to your account to continue the process
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <>
                      <StyledInput
                        {...field}
                        icon={<MailOutline />}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <span className={errorMessageClass}>{errors.email.message}</span>
                      )}
                    </>
                  )}
                  rules={{ required: "Email is required" }}
                />
                <Controller
                  name="password"
                  control={control}
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
                        placeholder="Enter your password"
                      />
                      {errors.password && (
                        <span className={errorMessageClass}>{errors.password.message}</span>
                      )}
                    </>
                  )}
                  rules={{ required: "Password is required" }}
                />
                {isLoading ? (
                  <div className="flex justify-center">
                    <StyledLoader />
                  </div>
                ) : (
                  <StyledButton variant="primary" width="100%" type="submit" disabled={isLoading}>
                    Sign in
                  </StyledButton>
                )}
                <button
                  type="button"
                  className="mb-8 cursor-pointer text-left text-sm font-normal text-[#2D9CDB]"
                  onClick={() => setForgotShow(!forgotShow)}
                >
                  Forgot Your Password?
                </button>
              </form>
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h1 className="mb-1 text-2xl font-semibold text-foreground">
                  Forgot Your Password?
                </h1>
                <Close onClick={() => setForgotShow(!forgotShow)} className="cursor-pointer" />
              </div>
              <p className="mb-8 text-sm font-normal text-[#828282]">We will send you a reset link</p>
              <form onSubmit={handleSubmit(handleForgot)} className="flex flex-col gap-8">
                <Controller
                  name="remail"
                  control={control}
                  render={({ field }) => (
                    <>
                      <StyledInput
                        {...field}
                        icon={<MailOutline />}
                        placeholder="Enter your email"
                      />
                      {errors.remail && (
                        <span className={errorMessageClass}>{errors.remail.message}</span>
                      )}
                    </>
                  )}
                  rules={{ required: "Email is required" }}
                />
                <StyledButton variant="primary" width="100%" type="submit">
                  Send
                </StyledButton>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
