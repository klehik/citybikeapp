import * as React from 'react'
import StationList from './StationList'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'

import { Box, Grid, Typography } from '@mui/material'
import Map from './Map'

const Stations = () => {
  const [stations, setStations] = useState([])
  const [page, setPage] = useState(1)
  const [hasMorePages, setHasMorePages] = useState(true)

  const [lat, setLat] = useState(60.1656801793916)
  const [lng, setLng] = useState(24.9314215703651)

  const getStations = async (page) => {
    const response = await axios.get('/stations', { params: { page: page } })

    setStations(response.data.data)
    setHasMorePages(response.data.hasMore)
  }

  useEffect(() => {
    getStations(page)
  }, [page])

  const handleNextPage = () => {
    if (hasMorePages) {
      setPage(page + 1)
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const hadleTableCellClick = (station) => {
    const lat = station.coordinates.lat
    const lng = station.coordinates.lng

    setLat(lat)
    setLng(lng)
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <StationList
            stations={stations}
            handleClick={hadleTableCellClick}
          ></StationList>
          <Typography>{page}</Typography>
          <Button onClick={handlePreviousPage}>previous</Button>
          <Button onClick={handleNextPage}>next</Button>
        </Grid>
        <Grid item xs={6}>
          <Map coordinates={{ lat: lat, lng: lng }}></Map>
        </Grid>
      </Grid>
    </>
  )
}

export default Stations
