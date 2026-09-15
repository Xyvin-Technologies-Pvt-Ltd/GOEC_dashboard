import { Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import StyledSwitch from '../../../../../ui/styledSwitch';
import { toast } from 'react-toastify';
import { useChangeConfiguration } from '../../../../../hooks/mutations/useOcppMutation';

export default function ConfigSwitch({ label, value }) {
  const [checked, setChecked] = useState(value === 'true'); // Convert 'true'/'false' string to boolean
  const { mutateAsync: changeConfig, isPending } = useChangeConfiguration();

  const handleChange = async (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);

    try {
      const cpid = sessionStorage.getItem("cpid");
      const res = await changeConfig({
        cpid,
        data: {
          key: label,
          value: isChecked.toString(),
        }
      });
      if (res.status) {
        toast.success("Configuration updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update configuration.");
    }
  };

  return (
    <Stack direction="row" sx={{ backgroundColor: 'secondary.lightGray', justifyContent: 'space-between', p: 3, borderRadius: '4px', pr: 0 }}>
      <Typography>{label}</Typography>
      <StyledSwitch checked={checked} onChange={handleChange} disabled={isPending} />
    </Stack>
  );
}
