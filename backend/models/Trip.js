const mongoose = require('mongoose')

const tripSchema = mongoose.Schema({
  departureDate: { type: String, required: true },
  returnDate: { type: String, required: true },
  departureStation: {
    type: Number,
    ref: 'Station',
    required: true,
  },
  returnStation: {
    type: Number,
    ref: 'Station',
    required: true,
  },
  /* departureStationID: { type: Number, required: true },
  returnStationID: { type: Number, required: true },
  departureStationName: { type: String, required: true },
  returnStationName: { type: String, required: true }, */
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
