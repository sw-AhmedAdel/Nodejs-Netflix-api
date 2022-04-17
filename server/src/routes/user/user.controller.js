const {
  CreateUser,
  FindUser,
  UpdateUser,
  DeleteUser,
  GetALlUsers,
  findByrCedenitals,
  GetUserStats
} = require('../../models/user.models');
const sendCookieVieRespond = require('../../authController/cookie');
const appError = require('../../handelErros/class.handel.errors');
const {FindMovie} = require('../../models/movie.models');

function filterUser (obj , ...arr) {
  const filter = {};
  Object.keys(obj).forEach((el) => {
    if(arr.includes(el)){
      filter[el] = obj[el]
    }
  })
  return filter;
}

async function httpCreateUser (req ,res ,next) {
 
  const user = req.body;
  const newUser = await CreateUser(user);
  sendCookieVieRespond(newUser, res);
  return res.status(201).json({
    status:'success',
    data: newUser,
  })
}

async function httpLoginUser (req ,res ,next) {
  const {email , password} = req.body;
 
  if(!email || !password) {
    return next(new appError('Email and password must be provided'))
  }
  const user = await findByrCedenitals(email , password);
  if(!user) {
    return next(new appError('Unable to login', 401));
  }
  sendCookieVieRespond(user , res);

  return res.status(201).json({
  
    status:'success',
    data : user,
  })
}

async function httpGetALlUsers(req ,res ,next) {
  const users = await GetALlUsers();
  return res.status(200).json({
    status:'success',
    data : users
  });
}

async function httpGetSingleUser(req ,res ,next) {
  const {userid} = req.params;
  const user = await FindUser({
    _id : userid
  })
  if(!user) {
    return next(new appError('User is not found', 404))
  }
  return res.status(200).json({
    status:'success',
    data : user
  })
}


async function httpUpdateUser(req ,res ,next) {
  if(req.body.password || req.body.passwordConfirm) {
    return next(new appError('please update password from v1/users/updatepassword', 400));
   }
  
  const userid = req.user._id;
  const filter = filterUser(req.body , 'name','email');
  const user = await UpdateUser(filter , userid);
  return res.status(200).json({
    status:'success',
    data : user,
  })
}

async function httpDeleteUser (req ,res ,next) {
  const userid = req.user._id;
  await DeleteUser(userid);
  return res.status(200).json({
    status:'success',
    message:'You deleted your account'
  })

}

function httpLogout(req , res ) {
  res.cookie('token' , 'Logout', {
    httpOnly : true,
    expires: new Date(Date.now())
  })
  if( process.env.NODE_ENV === 'development'){
    return res.status(200).json({
      status:'success',
      messae:'You loged out'
    })
   } 
}

async function httpGetUserStats(req ,res ,next) {

  const users = await GetUserStats();
  return res.status(200).json({
    status:'success',
    data:users
  })
}

async function httpAddMovieToMyFav (req ,res ,next) {
  const {movieid} = req.params;
  const movie = await FindMovie({
    _id : movieid
  })
  if(!movie) {
    return next (new appError('Movie is not extis', 400));
  }
  req.user.myFav = [...req.user.myFav , movieid] ;
  await req.user.save();
  return res.status(200).json({
    status:'success',
    messgae:`${movie.title} has been added `
  })
 
}

async function httpDeleteMovieFromMyFav(req ,res ,next) {
  const {movieid} = req.params;
  req.user.myFav=req.user.myFav.filter((mov) => mov._id.toString() !== movieid.toString());
  await req.user.save();
  return res.status(200).json({
    status:'success',
  })

}

async function httpGetMyFavMovie(req ,res ,next) {
  const movies = req.user.myFav;
  return res.status(200).json({
    status:'sucess',
    data:movies,
  })
}

module.exports = {
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
}