const express = require('express');
const api = express.Router();
const userRoute = require('./user/user.route');
const movieRoute = require('./movie/movie.route');
const listRoute = require('./list/list.route')

api.use('/lists' , listRoute)
api.use('/movies', movieRoute)
api.use('/users', userRoute);

module.exports = api;