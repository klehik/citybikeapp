require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const DATA_FOLDER_PATH = process.env.DATA_FOLDER_PATH

module.exports = {
  PORT,
  MONGODB_URI,
  DATA_FOLDER_PATH,
}
