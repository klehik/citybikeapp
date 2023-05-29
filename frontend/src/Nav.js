import { Box, Button, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ width: 1, height: '20%' }}>
      <Typography variant="h5">Citybike Database</Typography>

      <Box>
        <Button onClick={() => navigate('/stations')}>Stations</Button>
        <Button onClick={() => navigate('/trips')}>Trips</Button>
      </Box>
    </Box>
  )
}
export default Nav
