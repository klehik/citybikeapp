import Trips from './Trips'
import { Box } from '@mui/material'
import Stations from './Stations'
import Nav from './Nav'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <Box sx={{ width: 1, height: '100%' }}>
      <Nav></Nav>
      <Box sx={{ width: 1, height: '100%' }}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/stations" />} />
          <Route path="/stations" element={<Stations></Stations>} />
          <Route path="/trips" element={<Trips></Trips>}></Route>
        </Routes>
      </Box>
    </Box>
  )
}

export default App
