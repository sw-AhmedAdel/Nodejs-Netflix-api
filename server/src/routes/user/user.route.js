const express = require('express');
const userRoute = express.Router();

const catchAsync = require('../../authController/catchAsync');
const {
  httpCreateUser,
  httpDeleteUser,
  httpGetALlUsers,
  httpLogout,
  httpGetSingleUser,
  httpUpdateUser,
  httpLoginUser
} = require('./user.controller');

const authenticate = require('../../authController/authenticate');
const authorized = require('../../authController/authorized');


userRoute.post('/signup' , catchAsync( httpCreateUser));
userRoute.post('/login' , catchAsync(httpLoginUser));

userRoute.use(catchAsync(authenticate))

userRoute.get('/get/user/:userid' , catchAsync( httpGetSingleUser));
userRoute.patch('/updateme' , catchAsync( httpUpdateUser));
userRoute.delete('/deleteme' ,  catchAsync(httpDeleteUser));
userRoute.get('/logout' ,catchAsync( httpLogout));

userRoute.use(authorized('admin'));
userRoute.get('/', catchAsync( httpGetALlUsers));

module.exports = userRoute;


