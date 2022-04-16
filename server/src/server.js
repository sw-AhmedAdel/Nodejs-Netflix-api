const http = require('http');
const app = require('./app');
const server = http.createServer(app);
require('dotenv').config();
const PORT = process.env.PORT;

const {startMongo} = require('./services/mongo');
const {loadAllMovies} = require('./models/movie.models');
const {loadAllLists} = require('./models/list.models');
const User = require('./models/user.mongo');
const Movie = require('./models/movie.mongo')
const List = require('./models/list.mongo');
 
async function startServer () {
 
  await startMongo();
  if(process.argv[2]==='im'){
    await loadAllMovies();
  }

  if(process.argv[2]==='il'){
    await loadAllLists();
   
  }
  //await User.deleteMany()
  // await Movie.deleteMany()
  //await List.deleteMany()
 
  server.listen(PORT , () => {
  console.log('running server');
  })
}

startServer();