import React from "react";
import { Box, Container, Grid, Typography, Stack, Button } from "@mui/material";
import StyledDivider from "../../../../ui/StyledDivider";

export default function ChargePointDetailsAction({buttonClickHandle}) {
  const buttonStyle = { 
     
    borderRadius: "4px", 
    justifyContent: "center",
     px: 3, py: 1.5,
     width:'100%',
     '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'secondary.button'
   }
   }
  return (
    <Box sx={{ backgroundColor: "secondary.main", borderRadius: "4px" }}>
      <Stack pt={2} px={2} spacing={2}>
        <Typography
          sx={{ color: "secondary.contrastText", fontWeight: "700" }}
        >
          Actions
        </Typography>
      </Stack>
      <StyledDivider />

      <Stack sx={{ justifyContent: "center", px: 2, py: 4 }} spacing={3}>
        <Button sx={{backgroundColor: "#6C3333",...buttonStyle}} onClick={()=>{buttonClickHandle('hard')}} >
          <Typography
            sx={{ textAlign: 'center', color: "white", fontWeight: "500", fontSize: "14px" }}
          >
            Hard Reset
          </Typography>
        </Button>

        <Button sx={{ backgroundColor: "#885324",...buttonStyle}} onClick={()=>{buttonClickHandle('soft')}}>
          <Typography
            sx={{ textAlign: 'center', color: "white", fontWeight: "500", fontSize: "14px" }}
          >
            Soft Reset
          </Typography>
        </Button>

        <Button sx={{ backgroundColor: "#26426F",...buttonStyle}} onClick={()=>{buttonClickHandle('cache')}}>
          <Typography
            sx={{ textAlign: 'center',color: "white", fontWeight: "500", fontSize: "14px" }}
          >
            Clear Cache
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
}
