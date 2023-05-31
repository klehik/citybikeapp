# Helsinki city bike app (Dev Academy pre-assignment)

Repository for Solita Dev Academy pre-assignment. The task was to create a UI and a backend service for displaying data from journeys made with city bikes in the Helsinki Capital area. The dataset contains 3M+ journeys made in summer 2021.

## Implemented Features

- Separate views for exploring journeys and stations
- Pagination
- Searching stations
- Station locations on a map
- Station specific pick up and return count
- Sorting journeys by clicking column names

## Key Technologies

- Node.js & Express
- React
- Material UI
- MongoDB
- Docker

## Screenshots

#### Station view

<img style='height: 300px' src='img/stations_view.png'>

#### Search

<img style='height: 300px' src='img/searching_stations.png'>

#### Journey view, sorted by distance

<img style='height: 300px' src='img/trips_sorted_by_distance.png'>

## API endpoints

<Additional information about your API call. Try to use verbs that match both request type (fetching vs modifying) and plurality (one vs multiple).>

URL

Method:

<The request type>

GET | POST | DELETE | PUT

URL Params

<If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints.>

Required:

id=[integer]

Optional:

photo_id=[alphanumeric]

Data Params

<If making a post request, what should the body payload look like? URL Params rules apply here too.>

Success Response:

<What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!>

Code: 200
Content: { id : 12 }
Error Response:

<Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be.>

Code: 401 UNAUTHORIZED
Content: { error : "Log in" }
OR

Code: 422 UNPROCESSABLE ENTRY
Content: { error : "Email Invalid" }
Sample Call:

<Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable.>

Notes:

<This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here.>

## Installation

1.  Clone repository

    ```sh
    git clone https://github.com/klehik/citybikeapp.git
    ```

2.  Download 4 citybike data files

    - [2021-05.csv](https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv)
    - [2021-06.csv](https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv)
    - [2021-07.csv](https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv)
    - [stations.csv](https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv)

3.  Move the files into citybikeapp/backend/db/csv. Do not modify the filenames

    <img src='img/csv.png'>

4.  Set up and run backend using the options below

5.  Set up and run frontend with instructions below

### Backend option 1: Run backend in Docker container (recommended)

1. Install [Docker](https://docs.docker.com/get-docker/)
2. Build container
   ```sh
   cd backend
   docker-compose build
   ```
3. Run container. The citybike data files are imported to the database on the first run. It may take a while
   ```sh
   docker-compose up
   ```

### Backend option 2: Run backend without docker

1. Install [Node.js](https://nodejs.org/en/download)

2. Install [MongoDB](https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database)

3. Create .env file into citybikeapp/backend/ with MongoDB connection string
   ```js
   MONGO_URI = 'e.g. mongodb://127.0.0.1:27017/citybikeapp'
   ```
4. Install dependencies
   ```sh
   cd backend
   npm install
   ```
5. Run backend. The citybike data files are imported to the database on the first run. It may take a while
   ```sh
   npm start
   ```

### Frontend

1. Install [Node.js](https://nodejs.org/en/download) if not already installed

2. Install dependencies

   ```sh
   cd frontend
   npm install
   ```

3. Get a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) and create .env file into citybikeapp/frontend. App should work without the key but the map is dispalyed in development mode.
   ```js
   REACT_APP_MAPS_API_KEY = ''
   ```
4. Run and go to http://localhost:3000
   ```sh
   npm start
   ```
