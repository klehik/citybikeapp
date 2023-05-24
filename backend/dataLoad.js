const Station = require('./models/Station')
const Trip = require('./models/Trip')
const config = require('./utils/config')
const fs = require('fs')
const { parse } = require('csv-parse')

// TODO: Download csv-files from url
folder_path = config.DATA_FOLDER_PATH
filenames = ['2021-05.csv', '2021-06.csv', '2021-07.csv']
const stationFile =
  'Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat_avoin.csv'

const connectMongoDB = require('./db/connectMongoDB')

connectMongoDB(config.MONGODB_URI)

const getStation = async (stationID) => {
  const station = await Station.findOne({ stationID: stationID })

  return station._id
}

const loadStations = async (filename) => {
  await Station.deleteMany({})

  const stations = []
  const parser = fs.createReadStream(filename).pipe(
    parse({
      delimiter: ',',
      from_line: 2,
    })
  )
  for await (const item of parser) {
    // station object
    const station = {
      stationID: item[1],
      name: { fin: item[2], swe: item[3] },
      address: { fin: item[5], swe: item[6] },
      city: { fin: item[7], swe: item[8] },
      operator: item[9],
      capacity: item[10],
      coordinates: { x: item[11], y: item[12] },
    }
    stations.push(station)
    // with {ordered: false} insertMany does not cause error when validation error occurs
  }
  const inserted = await Station.insertMany(stations, { ordered: false })

  console.log(`inserted ${inserted.length} documents out of ${stations.length}`)
}

const loadTrips = async (filename) => {
  await Trip.deleteMany({})
  // TODO: validate and filter duration < 10s & coverDistance < 10m
  const trips = []
  let validationErrorCount = 0
  const parser = fs.createReadStream(filename).pipe(
    parse({
      delimiter: ',',
      from_line: 2,
    })
  )
  for await (const item of parser) {
    // trip object
    const trip = {
      departureDate: String(item[0]),
      returnDate: String(item[1]),
      departureStation: await getStation(Number(item[2])),
      returnStation: await getStation(Number(item[4])),
      coveredDistance: Number(item[6]),
      duration: Number(item[7]),
    }
    trips.push(trip)
  }
  // with {ordered: false} insertMany does not cause error when validation error occurs
  const inserted = await Trip.insertMany(trips, { ordered: false })

  console.log(`inserted ${inserted.length} documents out of ${trips.length}`)
}

const loadData = async () => {
  await loadStations(folder_path + stationFile)
  loadTrips(folder_path + 'sample.csv')
}

loadData()
