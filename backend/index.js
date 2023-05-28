const config = require('./utils/config')
const app = require('./app')
const connectMongoDB = require('./db/connectMongoDB')
const Trip = require('./models/Trip')
const Station = require('./models/Station')

connectMongoDB(config.MONGO_URI)

const port = config.PORT || 5001

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
