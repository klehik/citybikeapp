import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Container, Typography } from '@mui/material'

const StationList = ({ stations, handleClick }) => {
  console.log(stations)

  const boxSX = {
    '&:hover': {
      border: 0,
      color: 'gray',
      backgroundColor: 'lightblue',
      cursor: 'pointer',
    },
  }
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Capacity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stations.map((station) => (
              <TableRow
                onClick={() => handleClick(station)}
                key={station.id}
                sx={boxSX}
              >
                <TableCell>{station.name.fin}</TableCell>
                <TableCell>{station.address.fin} </TableCell>
                <TableCell>{station.city.fin}</TableCell>
                <TableCell>{station.capacity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default StationList
