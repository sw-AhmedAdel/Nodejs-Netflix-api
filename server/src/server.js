const http = require('http');
const app = require('./app');
const server = http.createServer(app);
require('dotenv').config();
const PORT = process.env.PORT;

const {startMongo} = require('./services/mongo');
const User = require('./models/user.mongo');

async function startServer () {
 
  await startMongo();
  //await User.deleteMany()
 server.listen(PORT , () => {
  console.log('running server');
  })
}

startServer();