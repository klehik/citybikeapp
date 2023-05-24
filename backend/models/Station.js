const mongoose = require('mongoose')
const stationSchema = mongoose.Schema({
  stationID: { type: Number, required: true },
  name: {
    fin: String,
    swe: String,
  },
  address: {
    fin: String,
    swe: String,
  },
  city: {
    fin: String,
    swe: String,
  },
  operator: String,
  capacity: Number,
  coordinates: {
    x: Number,
    y: Number,
  },
})

stationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Station', stationSchema)
