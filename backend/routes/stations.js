const express = require('express')
const router = express.Router()
const Station = require('../models/Station')
const Trip = require('../models/Trip')

router.get('/', async (req, res) => {
  // get paginated stations
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const count = await Station.countDocuments({})
  const pageCount = Math.ceil(count / limit)
  console.log(page, pageCount)

  const stations = await Station.find({})
    .limit(limit)
    .skip(limit * (page - 1))

  res
    .status(200)
    .json({ data: stations, hasMore: page < pageCount, pageCount: pageCount })
})

router.get('/trips', async (req, res) => {
  // get pick ups and returns by stationID
  const stationID = Number(req.query.stationID)
  console.log(stationID)
  const tripsStarted = await Trip.collection.countDocuments({
    departureStationID: stationID,
  })

  const tripsEnded = await Trip.collection.countDocuments({
    returnStationID: stationID,
  })

  res.status(200).json({ tripsStarted: tripsStarted, tripsEnded: tripsEnded })
})
module.exports = router
