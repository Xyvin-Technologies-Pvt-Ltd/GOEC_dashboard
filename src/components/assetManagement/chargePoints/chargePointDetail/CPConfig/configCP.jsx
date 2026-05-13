import { useState } from "react";
import { Stack, Typography, Modal, Button } from "@mui/material";
import StyledButton from "../../../../../ui/StyledButton";

export default function ConfigCP({ label, value, ...props }) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Stack
      direction={"row"}
      sx={{
        backgroundColor: "secondary.lightGray",
        p: 2,
        justifyContent: "space-between",
        borderRadius: "4px",
      }}
    >
      <Typography>{label}</Typography>
      {value !== "" ? (
        value.length > 20 ? (
          <>
            <Button onClick={handleOpenModal} sx={{ color: "#2D9CDB", justifyContent: "start" }}>
              View
            </Button>
            <Modal open={openModal} onClose={handleCloseModal}>
              <Stack
                sx={{
                  backgroundColor: "secondary.main",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "30%",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h6">{label}</Typography>
                <Typography sx={{ overflowWrap: "break-word", p:2 }}>{value}</Typography>
                <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
                  Close
                </Button>
              </Stack>
            </Modal>
          </>
        ) : (
          <Typography>{value}</Typography>
        )
      ) : (
        <Typography>-</Typography>
      )}
    </Stack>
  );
}
