const mongoose = require('mongoose')

mongoose.set('debug', true)

const connectMongoDB = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to Database')
    })
    .catch((err) => console.log(err))
}

module.exports = connectMongoDB
