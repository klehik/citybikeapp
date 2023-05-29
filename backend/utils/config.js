require('dotenv').config()

const PORT = process.env.PORT || 5001
const MONGO_URI = process.env.MONGO_URI

module.exports = {
  PORT,

  MONGO_URI,
}
