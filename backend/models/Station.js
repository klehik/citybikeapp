const mongoose = require('mongoose')
const stationSchema = require('./stationSchema')

module.exports = mongoose.model('Station', stationSchema)
