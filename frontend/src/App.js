import Button from '@mui/material/Button'

import Trips from './Trips'
import { Box, Container, Grid, Typography } from '@mui/material'
import Map from './Map'
import Stations from './Stations'
import Nav from './Nav'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
function App() {
  return (
    <Box sx={{ width: 1, height: '100%' }}>
      <Nav></Nav>
      <Box sx={{ width: 1, height: '100%' }}>
        <Routes>
          <Route path="/stations" element={<Stations></Stations>}></Route>
          <Route path="/trips" element={<Trips></Trips>}></Route>
        </Routes>
      </Box>
    </Box>
  )
}

export default App
