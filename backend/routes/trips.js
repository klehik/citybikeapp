const express = require('express')
const router = express.Router()
const Trip = require('../models/Trip')

router.get('/', async (req, res) => {
  // get trips
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const sort = req.query.sort || null
  const orderby = req.query.orderby === 'asc' ? 1 : -1
  const count = await Trip.collection.estimatedDocumentCount({})
  const pageCount = Math.ceil(count / limit)

  const trips = await Trip.find({})
    .skip(limit * (page - 1))
    .limit(limit)
    .sort(sort ? { [`${sort}`]: orderby } : null)

  res
    .status(200)
    .json({ data: trips, hasMore: page < pageCount, pageCount: pageCount })
})

module.exports = router
