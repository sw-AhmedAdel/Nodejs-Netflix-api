const http = require('http');
const app = require('./app');
const server = http.createServer(app);
require('dotenv').config();
const PORT = process.env.PORT;

const {startMongo} = require('./services/mongo');
const {loadAllMovies} = require('./models/movie.models');
const User = require('./models/user.mongo');
const Movie = require('./models/movie.mongo')

async function startServer () {
 
  await startMongo();
  if(process.argv[2]==='i'){
    await loadAllMovies();
    console.log('loaded all movies')
  }
  //await User.deleteMany()
 // await Movie.deleteMany()
  server.listen(PORT , () => {
  console.log('running server');
  })
}

startServer();