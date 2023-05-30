const mongoose = require('mongoose')
const initDB = require('../initdb')

mongoose.set('debug', false)

const connectMongoDB = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to Database')
      initDB()
    })
    .catch((err) => console.log(err))
}

module.exports = connectMongoDB
