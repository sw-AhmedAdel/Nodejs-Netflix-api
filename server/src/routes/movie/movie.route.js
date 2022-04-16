const express = require('express');
const movieRoute = express.Router();

const catchAsync = require('../../authController/catchAsync');
const authenticate = require('../../authController/authenticate');
const authorized = require('../../authController/authorized');

const {
  httpCreateMovie,
  httpGelAll,
  httpUpdateMovie,
  httpDeleteMovie,
  httpGetSingleMovie,
  httpGetRandomMovieOrSeries
} = require('./movie.controller');

movieRoute.use(catchAsync(authenticate));
movieRoute.get('/' , catchAsync(httpGelAll));
movieRoute.get('/get/:movieid', catchAsync(httpGetSingleMovie));

movieRoute.use(authorized('admin'));
movieRoute.post('/', catchAsync(httpCreateMovie));
movieRoute.delete('/update/:movieid', catchAsync(httpUpdateMovie));
movieRoute.delete('/delete/:movieid', catchAsync(httpDeleteMovie));
movieRoute.get('/random' , catchAsync( httpGetRandomMovieOrSeries));


module.exports = movieRoute;
