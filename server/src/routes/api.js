const express = require('express');
const api = express.Router();
const userRoute = require('./user/user.route');
const movieRoute = require('./movie/movie.route');

api.use('/movies', movieRoute)
api.use('/users', userRoute);

module.exports = api;