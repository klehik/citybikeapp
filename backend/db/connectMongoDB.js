const mongoose = require('mongoose')

mongoose.set('debug', true)

const connectMongoDB = (url) => {
  console.log('Connecting to mongodb')
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = connectMongoDB