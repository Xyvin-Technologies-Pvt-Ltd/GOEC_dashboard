import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Grid, Button, Dialog } from "@mui/material";
import StyledDivider from "../../../../ui/styledDivider";
import { ReactComponent as Qr_evplug } from "../../../../assets/icons/material-symbols_qr-code.svg";
import { ReactComponent as Mdi_unlocked } from "../../../../assets/icons/mdi_unlocked.svg"
import { getConnectorIcon } from "../../../../utils/connectorIcons";
import { Download } from "@mui/icons-material";
import { Transition } from "../../../../utils/DialogAnimation";


const QRPopUp = ({ open, onClose, url, title, connectorId }) => {
  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <Stack direction={"column"} sx={{ backgroundColor: 'primary.main' }}>
        <Box p={2}>
          <img src={ url} height={200}
            style={{ aspectRatio: 1 / 1, filter: 'invert(100%)' }} />
        </Box>
        <Button m={1} p={1} mt={3}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            backgroundColor: "#4A4458",
            borderRadius: "4px",
            cursor: 'pointer',
            m: 2,
            '&:hover': {
              cursor: 'pointer',
              backgroundColor: 'secondary.main'
            }
          }}
          onClick={() => {
            // using Java Script method to get PDF file
            fetch(url).then((response) => {
                response.blob().then((blob) => {
                 
                    // Creating new object of PDF file
                    const fileURL =
                        window.URL.createObjectURL(blob);
                         
                    // Setting various property values
                    let alink = document.createElement("a");
                    alink.href = fileURL;
                    alink.download = `${title+"_"+connectorId}.png`;
                    alink.click();
                });
            });
        }}
        >
          <Download sx={{ color: '#fff' }} />
          <Typography
            sx={{ textAlign: 'center', color: "white", fontWeight: "500", fontSize: "14px" }}
          >
            Download
          </Typography>

        </Button>
      </Stack>
    </Dialog>
  )
}


export default function ChargePointDetailsConnectors({ data, unlockButtonHandle }) {
  const [qrOpen, setQropen] = useState(false)
  const [qrURL, setQrURL] = useState('')
  const [qrTitle, setQrTitle] = useState('')
  const [connectorName, setConnectorName] = useState('')
  const [connectors, setConnectors] = useState([])


  useEffect(()=>{
    if (data) {
      setConnectors(data.connectors.map((dt,index)=>(
        {...dt,...data.evModelDetails[0].connectors[index]}
      )))
      setConnectorName(data.name)
    }
  },[data])
  return (
    <Box
      sx={{ backgroundColor: "secondary.main", borderRadius: "4px" }}
    >
      <QRPopUp open={qrOpen} onClose={() => { setQropen(false) }} url={qrURL} title={connectorName} connectorId={qrTitle}/>
      <Box container spacing={2} px={6}>
        <Stack direction={"row"} spacing={2} pt={2}>
          <Typography
            sx={{ color: "secondary.contrastText", fontWeight: "700" }}
          >
            Connectors
          </Typography>
        </Stack>
      </Box>
      <StyledDivider />


      <Grid container spacing={3}
        sx={{ alignItems: "center", justifyContent: "center", py: 2, px: 2 }}
      >
        {
          connectors && connectors.map((item) => (
            <Grid item xs={6} sm={4} md={6}>
              <Stack direction={"column"}
                sx={{ backgroundColor: "#2B2930", borderRadius: "4px", justifyContent: 'flex-end' }}
              >
                <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                  <Qr_evplug style={{ cursor: 'pointer' }} onClick={() => { setQropen(true); setQrURL(item.qrCode); setQrTitle(item.connectorId) }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  {getConnectorIcon(item.type, item.status)}
                </Box>
                <Button m={1} p={1} mt={3}
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    backgroundColor: "#4A4458",
                    borderRadius: "4px",
                    cursor: 'pointer',
                    m: 2,
                    '&:hover': {
                      cursor: 'pointer',
                      backgroundColor: 'secondary.main'
                    }
                  }}
                  onClick={() => { unlockButtonHandle(item.connectorId); setQrURL(item.qrCode) }}
                >
                  <Mdi_unlocked />
                  <Typography
                    sx={{ textAlign: 'center', color: "white", fontWeight: "500", fontSize: "14px" }}
                  >
                    Unlock
                  </Typography>

                </Button>
              </Stack>
            </Grid>
          ))
        }

      </Grid>



    </Box>
  );
}
