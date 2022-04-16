const express = require('express')
const listRoute = express.Router();

const catchAsync = require('../../authController/catchAsync');
const authenticate = require('../../authController/authenticate');
const authorized = require('../../authController/authorized');

const {
  httpCreatNewList,
  httpGeTAllList,
  httpUdateList,
  httpDeleteList,
  httpFindList,
  httpAddMovieToList,
  httpRemoveMovieFromList
} =require('./list.controller');


listRoute.route(catchAsync(authenticate))
listRoute.get('/', catchAsync(httpGeTAllList));
listRoute.get('/list/:listid' , catchAsync(httpFindList))

listRoute.route(authorized('admin'));
listRoute.post('/', catchAsync(httpCreatNewList));
listRoute.patch('/list/:listid' , catchAsync(httpUdateList))
listRoute.delete('/list/:listid' , catchAsync(httpDeleteList))
listRoute.post('/add/movie/list/:listid/:movieid' ,  catchAsync(httpAddMovieToList));
listRoute.delete('/remove/movie/list/:listid/:movieid' ,  catchAsync(httpRemoveMovieFromList));

module.exports = listRoute;