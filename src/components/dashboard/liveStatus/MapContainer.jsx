import React, { useEffect } from 'react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';
import operationalIconUrl from '../../../assets/icons/MapIcons/blueGoec.svg?url';
import nonOperationalIconUrl from '../../../assets/icons/MapIcons/greyGoec.svg?url';
import busyOperationalIconUrl from '../../../assets/icons/MapIcons/orangeGoec.svg?url';
import faultOperationalIconUrl from '../../../assets/icons/MapIcons/redGoec.svg?url';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';



export default function MapContainer({ chargingStations }) {

  const [selectedCenter, setSelectedCenter] = useState(null);


  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedCenter(null);
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  },
    []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCGj0hRgN-cr02TaGzHjCY9QilpB5nsMAs'
  })

  const mapStyles = {
    height: "75vh",
    width: "100%"
  };

  const defaultCenter = {
    lat: 10.013938, lng: 76.311999
  }


  return (
    <Box sx={{ borderRadius: '8px', overflow: 'hidden' }}>
      {isLoaded &&
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
          streetViewControl={false}
          onClick={() => setSelectedCenter(null)}
        >
          {
            chargingStations.map((item) => {

              const position = {
                lat: parseFloat(item.latitude),
                lng: parseFloat(item.longitude)
              };


              
              return (
                <Marker key={item.id}
                  position={position}
                  icon={{
                    url: item.charger_status.toLowerCase() === 'available' ? operationalIconUrl : item.charger_status.toLowerCase() === 'busy' ? faultOperationalIconUrl : item.charger_status.toLowerCase() === 'unavailable' ? nonOperationalIconUrl : nonOperationalIconUrl,
                    scaledSize: new window.google.maps.Size(35, 35), // Scale the icon size
                    anchor: new window.google.maps.Point(10, 10), // Anchor the icon
                  }}
                  onClick={() => setSelectedCenter({position,...item})}
                />
              )
            })
          }


          {selectedCenter && <InfoWindow
            onCloseClick={() => {
              setSelectedCenter(null);
            }}
            position={selectedCenter.position}
          >
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <img src={`${selectedCenter.image}`} height={'100px'} width={'100%'} style={{ objectFit: 'cover' }} />
              </Grid>
              <Grid item xs={9} >
                <Stack sx={{ justifyContent: "center", height: '100%' }}>
                  <Typography variant='body2' color={'#000'} sx={{ fontWeight: '500' }}>{selectedCenter.name}</Typography>
                  <Typography variant='body2' color={'#000'} sx={{ fontWeight: '300' }}>{selectedCenter.address}</Typography>
                </Stack>
              </Grid>
            </Grid>
          </InfoWindow>}
        </GoogleMap>
      }

    </Box>
  )
}
