import { Box, Dialog, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import StyledInput from '../../../../ui/styledInput'
import StyledWarning from '../../../../ui/styledWarning'
import { ReactComponent as Close } from "../../../../assets/icons/close-icon-large.svg";
import { ErrorOutlineOutlined, WarehouseOutlined, Warning } from '@mui/icons-material'
import StyledDivider from '../../../../ui/styledDivider';
import StyledButton from '../../../../ui/styledButton';
import { useForm, Controller } from "react-hook-form";
import { Transition } from '../../../../utils/DialogAnimation';
import { toWallet } from '../../../../services/userApi';
import { toast } from 'react-toastify';


export default function DeductWallet({userData, onIsChange, isChange, open, onClose, ...props }) {

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
    clearErrors,
    reset
  } = useForm({
    defaultValues: {
      published: false, // Set the default value for "activate"
    },
  });

  const previousBalance = watch("previousBalance", userData?.wallet && userData?.wallet.toFixed(2));
  const amount = watch("amount", 0);
  const updatedBalance = Number(previousBalance) + Number(-amount);

  useEffect(() => {
    setValue("updatedBalance", updatedBalance);
  }, [previousBalance, amount]);

  const onSubmit = async (data) => {
    const postData = {
      amount: -1*Math.abs(data.amount),
      transactionId: data.reference,
      reference: data.reference,
      doneByAdmin:true,
      type:"admin deduction"
    };
    const res = await toWallet(userData._id, postData);
    if (res) {
      const successToastId = toast.success("Money deduct from wallet...", {
        position: "top-right",
      });
      toast.update(successToastId);
      reset();
      onClose && onClose();
      onIsChange(!isChange)
    }
  };
    
  return (
    <Dialog open={open} maxWidth={"sm"} fullWidth TransitionComponent={Transition}>
      <Box sx={{ backgroundColor: "primary.main" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={"row"}
            sx={{
              justifyContent: "space-between",
              px: 2,
              py: 2,
              alignItems: "center",
            }}
          >
            <Typography color={"secondary.contrastText"} variant="h6">
            Deduct Wallet Balance
            </Typography>
            <Close
              style={{ cursor: "pointer" }}
              onClick={() => {
                onClose && onClose();
              }}
            />
          </Stack>
          <StyledDivider />
          <Stack sx={{ p: 4 }} spacing={1}>
            <Stack direction={"column"} spacing={2}>
              <Typography variant="subtitle2" sx={{ color: "secondary.contrastText" }}>
                Previous Balance
              </Typography>

              <Controller
                name="previousBalance"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledInput
                      placeholder={"Previous Balance"}
                      value={userData?.wallet && userData?.wallet.toFixed(2)}
                      disabled
                    />
                   
                  </>
                )}
              />
            </Stack>

            <Stack direction={"column"} spacing={2}>
              <Typography variant="subtitle2" sx={{ color: "secondary.contrastText" }}>
                Deduct Amount <span style={{ color: "#D14343" }}>*</span>
              </Typography>

              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledInput placeholder={"Add amount"} {...register("amount")} />

                    {errors.amount && (
                      <StyledWarning
                        icon={<ErrorOutlineOutlined sx={{ color: "error.main" }} />}
                        value={errors.amount.message}
                      />
                    )}
                  </>
                )}
                rules={{ required: "Please enter the Amount" }}
              />
            </Stack>

            <Stack direction={"column"} spacing={2}>
              <Typography variant="subtitle2" sx={{ color: "secondary.contrastText" }}>
                Updated Balance
              </Typography>

              <Controller
                name="updatedBalance"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledInput placeholder={"updated Balance"} {...register("updatedBalance")} />
                    {errors.updatedBalance && (
                      <StyledWarning
                        icon={<ErrorOutlineOutlined sx={{ color: "error.main" }} />}
                        value={errors.updatedBalance.message}
                      />
                    )}
                  </>
                )}
                rules={{ required: "Please enter the Amount" }}
              />
            </Stack>

            <Stack direction={"column"} spacing={2}>
              <Typography variant="subtitle2" sx={{ color: "secondary.contrastText" }}>
                Reference <span style={{ color: "#D14343" }}>*</span>
              </Typography>

              <Controller
                name="reference"
                control={control}
                render={({ field }) => (
                  <>
                    <StyledInput placeholder={"Name"} {...register("reference")} />
                    {errors.reference && (
                      <StyledWarning
                        icon={<ErrorOutlineOutlined sx={{ color: "error.main" }} />}
                        value={errors.reference.message}
                      />
                    )}
                  </>
                )}
                rules={{ required: "Please enter the Amount" }}
              />
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            sx={{ backgroundColor: "secondary.main", px: 3, py: 2 }}
            spacing={2}
            justifyContent={"end"}
          >
            <StyledButton
              variant={"secondary"}
              style={{ width: "130px", height: "48px" }}
              onClick={(e) => {
                e.preventDefault();
                onClose && onClose();
              }}
            >
              Cancel
            </StyledButton>
            <StyledButton
              variant={"primary"}
              style={{ width: "180px", height: "48px" }}
              type="submit"
            >
              Deduct
            </StyledButton>
          </Stack>
        </form>
      </Box>
    </Dialog>
  );
}
