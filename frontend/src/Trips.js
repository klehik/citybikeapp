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
import { Box, Container, Grid, Typography } from '@mui/material'

const Trips = () => {
  const [trips, setTrips] = useState([])
  const [page, setPage] = useState(1)
  const [hasMorePages, setHasMorePages] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const getTrips = async (page) => {
    const response = await axios.get('/trips', {
      params: {
        page: page,
        limit: 20,
        sort: null,
        orderby: 'asc',
      },
    })

    setTrips(response.data.data)
    setHasMorePages(response.data.hasMore)
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)
    getTrips(page)
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
  return (
    <>
      <TableContainer component={Paper}>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
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

        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Distance</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? null
              : trips.map((trip) => (
                  <TableRow
                    /* onClick={() =>
                  handleClick(trip.departureStationID, trip.returnStationID)
                } */
                    key={trip.id}
                  >
                    <TableCell>
                      {new Date(trip.departureDate).toUTCString()}
                    </TableCell>
                    <TableCell>{Math.round(trip.duration / 60)} min</TableCell>
                    <TableCell>
                      {Math.round((trip.coveredDistance / 1000) * 10) / 10} km
                    </TableCell>
                    <TableCell>{trip.departureStationName}</TableCell>
                    <TableCell>{trip.returnStationName}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Trips
