import * as React from 'react'
import StationList from './StationList'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import { Box, Container, Grid, Typography } from '@mui/material'
import Map from './Map'

const Stations = () => {
  const [stations, setStations] = useState([])
  const [page, setPage] = useState(1)
  const [hasMorePages, setHasMorePages] = useState(true)
  const [selectedStation, setSelectedStation] = useState(null)

  const getStations = async (page) => {
    const response = await axios.get('/stations', {
      params: { page: page, limit: 18 },
    })

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
    setSelectedStation(station)
  }
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Button onClick={handlePreviousPage}>previous</Button>
            <Typography>{page}</Typography>
            <Button onClick={handleNextPage}>next</Button>
          </Grid>
        </Grid>
        <StationList
          stations={stations}
          handleClick={hadleTableCellClick}
        ></StationList>
      </Grid>
      <Grid item xs={12} md={6}>
        <Map station={selectedStation}></Map>
      </Grid>
    </Grid>
  )
}

export default Stations
