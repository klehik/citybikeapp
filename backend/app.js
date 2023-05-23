const express = require('express')
const app = express()
require('express-async-errors')
const tripsRouter = require('./routes/trips')

app.use('/trips', tripsRouter)

module.exports = app
