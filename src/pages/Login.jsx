import React, { useState } from "react";
import { MailOutline, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import HeaderLogo from "../assets/header-logo.png";
import StyledLoader from "../ui/StyledLoader";
import { ReactComponent as Close } from "../assets/icons/close-circle.svg";

function IconInput({ icon, iconRight, error, className, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&>svg]:h-4 [&>svg]:w-4">
        {icon}
      </span>
      <Input
        className={cn(
          "pl-10",
          iconRight && "pr-10",
          error && "border-destructive focus-visible:ring-destructive",
          className,
        )}
        {...props}
      />
      {iconRight && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground [&>svg]:h-4 [&>svg]:w-4">
          {iconRight}
        </span>
      )}
    </div>
  );
}

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
    defaultValues: { email: "", password: "", remail: "" },
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

  const handleForgot = () => navigate("/forgot-password");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-sm">
        <Card className="overflow-hidden shadow-2xl">
          {/* Logo */}
          <div className="flex items-center justify-center bg-card px-6 py-6">
            <img src={HeaderLogo} alt="GOEC" className="h-12 w-auto object-contain" />
          </div>
          <Separator />

          {!forgotShow ? (
            <>
              <CardHeader className="pb-4 pt-6">
                <CardTitle className="text-xl">Sign In</CardTitle>
                <CardDescription>Login to your account to continue</CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="flex flex-col gap-4">
                  {/* Email */}
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Email is required" }}
                    render={({ field }) => (
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <IconInput
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          autoComplete="email"
                          error={errors.email}
                          icon={<MailOutline />}
                          {...field}
                        />
                        {errors.email && (
                          <p className="text-xs text-destructive">{errors.email.message}</p>
                        )}
                      </div>
                    )}
                  />

                  {/* Password */}
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <IconInput
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          error={errors.password}
                          icon={<Lock />}
                          iconRight={
                            <button
                              type="button"
                              onClick={() => setShowPassword((v) => !v)}
                              className="cursor-pointer"
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </button>
                          }
                          {...field}
                        />
                        {errors.password && (
                          <p className="text-xs text-destructive">{errors.password.message}</p>
                        )}
                      </div>
                    )}
                  />
                </CardContent>

                <CardFooter className="flex flex-col gap-3 pt-2">
                  {isLoading ? (
                    <div className="flex h-10 w-full items-center justify-center">
                      <StyledLoader />
                    </div>
                  ) : (
                    <Button variant="gradient" size="lg" className="w-full" type="submit" disabled={isLoading}>
                      Sign In
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="link"
                    className="text-link"
                    onClick={() => setForgotShow(true)}
                  >
                    Forgot your password?
                  </Button>
                </CardFooter>
              </form>
            </>
          ) : (
            <>
              <CardHeader className="pb-4 pt-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Reset Password</CardTitle>
                  <button
                    type="button"
                    onClick={() => setForgotShow(false)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Back to sign in"
                  >
                    <Close className="h-5 w-5" />
                  </button>
                </div>
                <CardDescription>
                  Enter your email and we'll send you a reset link
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit(handleForgot)}>
                <CardContent className="flex flex-col gap-4">
                  <Controller
                    name="remail"
                    control={control}
                    rules={{ required: "Email is required" }}
                    render={({ field }) => (
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="remail">Email</Label>
                        <IconInput
                          id="remail"
                          type="email"
                          placeholder="Enter your email"
                          autoComplete="email"
                          error={errors.remail}
                          icon={<MailOutline />}
                          {...field}
                        />
                        {errors.remail && (
                          <p className="text-xs text-destructive">{errors.remail.message}</p>
                        )}
                      </div>
                    )}
                  />
                </CardContent>

                <CardFooter className="flex flex-col gap-3 pt-2">
                  <Button variant="gradient" size="lg" className="w-full" type="submit">
                    Send Reset Link
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    className="text-muted-foreground"
                    onClick={() => setForgotShow(false)}
                  >
                    ← Back to sign in
                  </Button>
                </CardFooter>
              </form>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
