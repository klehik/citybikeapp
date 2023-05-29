const express = require('express')
const router = express.Router()
const Trip = require('../models/Trip')

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const count = await Trip.collection.estimatedDocumentCount({})
  const pageCount = Math.ceil(count / limit)

  const trips = await Trip.find({})
    .skip(limit * page)
    .limit(limit)

  res.status(200).json({ data: trips, hasMore: page < pageCount - 1 })
})

router.get('/:id', async (req, res) => {
  const trip = await Trip.findById(req.params.id)
  res.status(200).json(trip)
})
module.exports = router
