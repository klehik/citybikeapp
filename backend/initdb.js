const { parse } = require('csv-parse')
const fs = require('fs')
const Station = require('./models/Station')
const Trip = require('./models/Trip')

const initDB = async () => {
  // csv data
  const stationsCSV =
    './db/csv/Helsingin_ja_Espoon_kaupunkipy%C3%B6r%C3%A4asemat_avoin.csv'
  const filenames = [
    './db/csv/2021-05.csv',
    './db/csv/2021-06.csv',
    './db/csv/2021-07.csv',
  ]
  // import data if db does not exist or empty
  const station_count = await Station.collection.countDocuments()

  if (!station_count || station_count === 0) {
    console.log('importing stations')
    await importStations()
  }
  const trip_count = await Trip.collection.countDocuments()

  if (!trip_count || trip_count === 0) {
    console.log('importing trips')
    for (const file of filenames) {
      await importTrips(file)
    }
  }
}

const importStations = async () => {
  const stations = []

  console.log('Parsing CSV file:', stationsCSV)
  const parser = fs
    .createReadStream(stationsCSV)
    .pipe(parse({ delimiter: ',', fromLine: 2 }))

  for await (const item of parser) {
    // validation
    const stationID = Number(item[1])
    if (stationID < 1 || typeof stationID !== 'number') {
      continue
    }

    const station = {
      stationID: stationID,
      name: { fin: item[2], swe: item[3], en: item[4] },
      address: { fin: item[5], swe: item[6] },
      city: { fin: item[7], swe: item[8] },
      operator: item[9],
      capacity: item[10],
      coordinates: { lng: Number(item[11]), lat: Number(item[12]) },
    }

    stations.push(station)
  }
  // bulk insert
  console.log('Inserting data:', stations.length, 'documents')
  try {
    await Station.collection.insertMany(stations)
    console.log('Success')
  } catch (err) {
    console.log(err)
  }
}

const importTrips = async (file) => {
  // drop collection

  const trips = []

  console.log('Parsing CSV file:', file)
  const parser = fs
    .createReadStream(file)
    .pipe(parse({ delimiter: ',', fromLine: 2 }))

  for await (const item of parser) {
    // validation: empty string returns 0
    const coveredDistance = Number(item[6])
    const duration = Number(item[7])
    const departureStationID = Number(item[2])
    const returnStationID = Number(item[4])

    // reject document if one of the conditions is true
    if (
      departureStationID > 0 &&
      returnStationID > 0 &&
      duration >= 10 &&
      coveredDistance >= 10
    ) {
      // trip object
      const trip = {
        departureDate: item[0],
        returnDate: item[1],
        departureStationID: departureStationID,
        departureStationName: item[3],
        returnStationID: returnStationID,
        returnStationName: item[5],
        coveredDistance: coveredDistance,
        duration: duration,
      }
      trips.push(trip)
    }
  }
  // bulk insert
  console.log(`Inserting ${trips.length} documents`)

  try {
    await Trip.collection.insertMany(trips, { ordered: false }) // {ordered: false} speeds up inserting
    console.log('Success')
  } catch (err) {
    console.log(err)
  }
}

module.exports = initDB
