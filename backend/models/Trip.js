const mongoose = require('mongoose')

const tripSchema = mongoose.Schema({
  departureDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  departureStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true,
  },
  returnStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true,
  },
  /* departureStationID: { type: Number, required: true },
  returnStationID: { type: Number, required: true },
  departureStationName: { type: String, required: true },
  returnStationName: { type: String, required: true }, */
  coveredDistance: { type: String, required: true }, // meters
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
