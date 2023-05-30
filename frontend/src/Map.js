import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  InfoWindow,
} from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import axios from 'axios'

const Map = ({ station }) => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  })

  const [tripsStarted, setTripsStarted] = useState(null)
  const [tripsEnded, setTripsEnded] = useState(null)

  const coordinates = station
    ? station.coordinates
    : { lat: 60.1656801793916, lng: 24.9314215703651 }

  const getTrips = async (station) => {
    console.log(station)
    if (station) {
      const response = await axios.get('/stations/trips', {
        params: { stationID: station.stationID },
      })
      setTripsStarted(response.data.tripsStarted)
      setTripsEnded(response.data.tripsEnded)
      return () => {}
    }
  }

  useEffect(() => {
    setInfoWindowOpen(false)
    setTripsEnded(null)
    setTripsStarted(null)
    getTrips(station)
  }, [station])

  return (
    <Box sx={{ width: 1, height: '665px' }}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={coordinates}
          zoom={15}
        >
          {station ? (
            <MarkerF
              onClick={() => setInfoWindowOpen(!infoWindowOpen)}
              position={coordinates}
            >
              {infoWindowOpen ? (
                <InfoWindow
                  position={station.coordinates}
                  onCloseClick={() => setInfoWindowOpen(false)}
                >
                  <Box
                    sx={{
                      background: 'white',
                    }}
                  >
                    <h2>{station.name.en}</h2>
                    <p>Capacity: {station.capacity}</p>
                    <p>Pick ups: {tripsStarted ? tripsStarted : 'Loading'}</p>
                    <p>Returns: {tripsEnded ? tripsEnded : 'Loading'}</p>
                  </Box>
                </InfoWindow>
              ) : null}
            </MarkerF>
          ) : null}
        </GoogleMap>
      )}
    </Box>
  )
}

export default Map
