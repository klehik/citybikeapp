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
  coveredDistance: {
    type: Number,
    required: true,
    min: [10, 'distance less than 10 meters not accepted'],
  }, // meters
  duration: {
    type: Number,
    required: true,
    min: [10, 'trip duration less than 10 seconds not accepted'],
  }, // seconds
})

tripSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Trip', tripSchema)
