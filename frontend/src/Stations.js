import * as React from 'react'
import StationList from './StationList'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import { Grid, TextField, Typography } from '@mui/material'
import Map from './Map'

const Stations = () => {
  const [stations, setStations] = useState([])
  const [page, setPage] = useState(1)
  const [hasMorePages, setHasMorePages] = useState(true)
  const [pages, setPages] = useState(null)
  const [selectedStation, setSelectedStation] = useState(null)
  const [search, setSearch] = useState('')

  const getStations = async (page, search) => {
    const response = await axios.get('/stations', {
      params: { page: page, limit: 18, search: search },
    })

    setStations(response.data.data)
    setHasMorePages(response.data.hasMore)
    setPages(response.data.pageCount)
  }

  useEffect(() => {
    getStations(page, search)
  }, [page, search])

  useEffect(() => {
    setPage(1)
    getStations(page, search)
  }, [search])

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
            <Typography>
              {page}/{pages}
            </Typography>
            <Button onClick={handleNextPage}>next</Button>
            <TextField
              size="small"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search stations"
            ></TextField>
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
