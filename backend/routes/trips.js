const express = require('express')
const router = express.Router()
const Trip = require('../models/Trip')

router.get('/', async (req, res) => {
  const trips = await Trip.find({})
  res.status(200).json(trips)
})

router.get('/:id', async (req, res) => {
  const trip = await Trip.findById(req.params.id)
  res.status(200).json(trip)
})
module.exports = router
