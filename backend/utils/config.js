require('dotenv').config()

const PORT = process.env.PORT || 5001
const ENV = process.env.ENV
const MONGO_URI =
  ENV === 'docker' ? process.env.MONGO_DOCKER : process.env.MONGO_LOCAL

module.exports = {
  PORT,

  MONGO_URI,
}
