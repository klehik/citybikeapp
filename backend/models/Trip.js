const mongoose = require('mongoose')
const stationSchema = require('./stationSchema')

const tripSchema = mongoose.Schema({
  departureDate: { type: String, required: true },
  returnDate: { type: String, required: true },
  departureStation: stationSchema,
  returnStation: stationSchema,
  coveredDistance: { type: Number, required: true }, // meters
  duration: { type: Number, required: true }, // seconds
})

tripSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Trip', tripSchema)
