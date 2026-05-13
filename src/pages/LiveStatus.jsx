import React, { useEffect, useState } from "react";
import MapContainer from "../components/dashboard/liveStatus/MapContainer";
import { IconButton, Stack } from "@mui/material";
import { Map, TableRowsRounded } from "@mui/icons-material";
import TableContainer from "../components/dashboard/liveStatus/tableContainer";
import LastSynced from "../layout/LastSynced";
import { useUpdateChargingStationByList } from "../hooks/mutations/useChargingStationMutation";

export default function LiveStatus() {
  const [mapViewActive, setMapView] = useState(true);
  const [chargingStations, setChargingStations] = useState([]);

  const { mutate: updateList } = useUpdateChargingStationByList({
    onSuccess: (res) => {
      if (res.status) setChargingStations(res.result);
    },
  });

  const init = () => {
    updateList({ latitude: " 10.0136039", longitude: "76.3117538" });
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LastSynced heading="Live Status" reloadHandle={init} />
      <div className="p-3 sm:p-4">
        <Stack justifyContent="end" direction="row" spacing={2} mb={2}>
          <IconButton
            onClick={() => setMapView(!mapViewActive)}
            sx={{
              border: "1px solid",
              borderColor: "rgba(255,255,255,0.4)",
              borderRadius: 1,
              backgroundColor: mapViewActive ? "secondary.button" : undefined,
            }}
            aria-label="Map view"
          >
            <Map sx={{ color: mapViewActive ? "#fff" : undefined }} />
          </IconButton>
          <IconButton
            onClick={() => setMapView(!mapViewActive)}
            sx={{
              border: "1px solid",
              borderColor: "rgba(255,255,255,0.4)",
              borderRadius: 1,
              backgroundColor: !mapViewActive ? "secondary.button" : undefined,
            }}
            aria-label="Table view"
          >
            <TableRowsRounded sx={{ color: !mapViewActive ? "#fff" : undefined }} />
          </IconButton>
        </Stack>
        {mapViewActive ? (
          <MapContainer chargingStations={chargingStations} />
        ) : (
          <TableContainer data={chargingStations} />
        )}
      </div>
    </>
  );
}
