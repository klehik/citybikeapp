const express = require('express')
const app = express()
require('express-async-errors')
const tripsRouter = require('./routes/trips')
const stationRouter = require('./routes/stations')
const morgan = require('morgan')

app.use(morgan('tiny'))

app.use('/trips', tripsRouter)
app.use('/stations', stationRouter)

module.exports = app
