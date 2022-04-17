const express = require('express');
const userRoute = express.Router();

const catchAsync = require('../../authController/catchAsync');
const authenticate = require('../../authController/authenticate');
const authorized = require('../../authController/authorized');

const {
  httpCreateUser,
  httpDeleteUser,
  httpGetALlUsers,
  httpLogout,
  httpGetSingleUser,
  httpUpdateUser,
  httpLoginUser,
  httpGetUserStats,
  httpAddMovieToMyFav,
  httpDeleteMovieFromMyFav,
  httpGetMyFavMovie
} = require('./user.controller');

const {
  httpForgotPassword,
  httpResetPassword,
  httpUpdatePassword
} = require('../../password/password');


userRoute.post('/signup' , catchAsync( httpCreateUser));
userRoute.post('/login' , catchAsync(httpLoginUser));
userRoute.post('/forgotpassword' ,  catchAsync(httpForgotPassword));
userRoute.patch('/resetpassword/:token' , catchAsync(httpResetPassword));

userRoute.use(catchAsync(authenticate))
userRoute.get('/get/user/:userid' , catchAsync( httpGetSingleUser));
userRoute.patch('/updateme' , catchAsync( httpUpdateUser));
userRoute.patch('/update/my/password', catchAsync(httpUpdatePassword));
userRoute.delete('/deleteme' ,  catchAsync(httpDeleteUser));
userRoute.post('/add/fav/:movieid' , catchAsync(httpAddMovieToMyFav));
userRoute.delete('/remove/fav/:movieid' , catchAsync(httpDeleteMovieFromMyFav));
userRoute.get('/myfav', catchAsync(httpGetMyFavMovie));
userRoute.get('/logout' ,catchAsync( httpLogout));

userRoute.use(authorized('admin'));
userRoute.get('/', catchAsync( httpGetALlUsers));
userRoute.get('/stats/:year', catchAsync(httpGetUserStats));
module.exports = userRoute;


