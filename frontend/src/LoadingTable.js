import { TableCell, TableRow } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'

const LoadingTable = () => {
  return [...Array(18)].map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton variant="text"></Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton variant="text"></Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton variant="text"></Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton variant="text"></Skeleton>
      </TableCell>
      <TableCell>
        <Skeleton variant="text"></Skeleton>
      </TableCell>
    </TableRow>
  ))
}

export default LoadingTable
