import React, { useEffect, useRef, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { ReactComponent as ReloadIcon } from "../assets/icons/reload.svg";
import ReactTimeAgo from "react-time-ago";

export default function LastSynced({ heading, children, reloadHandle, lastSyncVisible = true }) {
  const [date, setDate] = useState(() => new Date());
  const [rotate, setRotate] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const startSpin = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    let r = 0;
    const step = () => {
      r += 6;
      if (r >= 360) {
        setRotate(0);
        return;
      }
      setRotate(r);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 2, md: 0 }}
      sx={{
        alignItems: { md: "center" },
        justifyContent: "space-between",
        backgroundColor: "primary.grey",
        p: 3,
        gap: { xs: 2, md: 0 },
      }}
    >
      <Stack direction="column" sx={{ ml: { xs: 0, md: 2 } }}>
        <Typography variant="body1" sx={{ color: "secondary.contrastText" }}>
          {heading}
        </Typography>
        {lastSyncVisible && (
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ color: "secondary.greytext", fontSize: 12 }}>Last synced</Typography>
            <Typography sx={{ color: "success.main", fontSize: 12 }}>
              <ReactTimeAgo date={date} locale="en-US" />
            </Typography>
            <ReloadIcon
              className="cursor-pointer"
              style={{ transform: `rotate(${rotate}deg)` }}
              onClick={() => {
                setDate(new Date());
                reloadHandle?.();
                startSpin();
              }}
            />
          </Stack>
        )}
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ width: { xs: "100%", md: "auto" } }}>
        {children}
      </Stack>
    </Stack>
  );
}
