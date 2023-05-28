import Button from '@mui/material/Button'

import Trips from './Trips'
import { Box, Grid, Typography } from '@mui/material'
import Map from './Map'
import Stations from './Stations'
import Nav from './Nav'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
function App() {
  return (
    <div>
      <Nav></Nav>
      <Routes>
        <Route path="/stations" element={<Stations></Stations>}></Route>
        <Route path="/trips" element={<Trips></Trips>}></Route>
      </Routes>
    </div>
  )
}

export default App
