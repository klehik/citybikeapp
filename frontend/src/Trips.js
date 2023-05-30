import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import { Box, Grid, Typography } from '@mui/material'
import { getDistanceString, getDurationString } from './utils'
import LoadingTable from './LoadingTable'

const Trips = () => {
  const [trips, setTrips] = useState([])
  const [page, setPage] = useState(1)
  const [hasMorePages, setHasMorePages] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [sortOption, setSortOption] = useState({ value: '', order: 'desc' })

  const getTrips = async (page, sortOption) => {
    const response = await axios.get('/trips', {
      params: {
        page: page,
        limit: 18,
        sort: sortOption.value,
        orderby: sortOption.order,
      },
    })

    setTrips(response.data.data)
    setHasMorePages(response.data.hasMore)
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    getTrips(page, sortOption)
  }, [page, sortOption])

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

  const handleSort = (value) => {
    const sortObject = {
      value: value,
      order: sortOption.order === 'desc' ? 'asc' : 'desc',
    }
    setSortOption(sortObject)
  }

  return (
    <Box sx={{ height: '665px' }}>
      <TableContainer component={Paper}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid
            container
            spacing={0}
            direction="roe"
            alignItems="center"
            justifyContent="center"
          >
            <Button onClick={handlePreviousPage}>previous</Button>
            <Typography>{page}</Typography>
            <Button onClick={handleNextPage}>next</Button>
          </Grid>
        </Grid>

        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('departureDate')}>
                Date
              </TableCell>
              <TableCell onClick={() => handleSort('duration')}>
                Duration
              </TableCell>
              <TableCell onClick={() => handleSort('coveredDistance')}>
                Distance
              </TableCell>
              <TableCell onClick={() => handleSort('departureStationName')}>
                From
              </TableCell>
              <TableCell onClick={() => handleSort('returnStationName')}>
                To
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <LoadingTable></LoadingTable>
            ) : (
              trips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell>
                    {new Date(trip.departureDate).toUTCString()}
                  </TableCell>
                  <TableCell>{getDurationString(trip.duration)}</TableCell>
                  <TableCell>
                    {getDistanceString(trip.coveredDistance)}
                  </TableCell>
                  <TableCell>{trip.departureStationName}</TableCell>
                  <TableCell>{trip.returnStationName}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Trips
