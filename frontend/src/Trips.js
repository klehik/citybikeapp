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

const Trips = () => {
  const [trips, setTrips] = useState([])
  const [page, setPage] = useState(1)
  const [hasMorePages, setHasMorePages] = useState(true)

  const getTrips = async (page) => {
    const response = await axios.get('/trips', {
      params: { page: page, limit: 10 },
    })

    setTrips(response.data.data)
    setHasMorePages(response.data.hasMore)
  }

  useEffect(() => {
    getTrips()
  }, [page])
  return (
    <>
      <TableContainer component={Paper}>
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
            {trips &&
              trips.map((trip) => (
                <TableRow
                  /* onClick={() =>
                  handleClick(trip.departureStationID, trip.returnStationID)
                } */
                  key={trip.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
