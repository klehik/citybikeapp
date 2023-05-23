const mongoose = require('mongoose')

const stationSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
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
module.exports = stationSchema
