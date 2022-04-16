const {
  CreateMovie,
  FindMovie,
  UpdateMovie,
  GetAll,
  DeleteMovie,
  GetRandomMovieOrSeries
} = require('../../models/movie.models');
const appError = require('../../handelErros/class.handel.errors');
const filterFeaturs =require('../../services/class.filter');

async function httpCreateMovie (req ,res ,next) {
  const movie = req.body;
  const newMovie = await CreateMovie(movie);
  return res.status(201).json({
    status:'success',
    data: newMovie
  })
}

async function httpGelAll (req ,res ,next) {
 
  const filter = {...req.query};
  const execludeFileds = ['page','sort','limit'];
  execludeFileds.forEach((el) => delete filter[el]);
  const features = new filterFeaturs(req.query , filter);

  const finalFilter = features.filterFun();
  const sortBy = features.sortBy();
  const {limit , skip} =features.getPagination();
  const movies = await GetAll(finalFilter , sortBy , limit , skip);
  return res.status(200).json({
    status:'success',
    resulta:movies.length ,
    data: movies
  })
}


async function httpUpdateMovie (req ,res ,next) {
  const {movieid} = req.params;
  const is_exits = await FindMovie({
    _id : movieid
  })
  if(!is_exits){
    return next (new appError('Movie is not extis'))
  }
  const movie = await UpdateMovie(req.body , movieid);
  return res.status(200).json({
    status:'success',
    data: movie
  })
}

async function httpDeleteMovie (req ,res ,next) {
  const {movieid} = req.params;
  const is_exits = await FindMovie({
    _id : movieid
  })
  if(!is_exits){
    return next (new appError('Movie is not extis'))
  } 
   await DeleteMovie(movieid);
  return res.status(200).json({
    status:'success',
    messgae:'Movie has been deleted'
  })
}


async function httpGetSingleMovie (req ,res ,next) {
  const {movieid} = req.params;
  const movie = await FindMovie({
    _id : movieid
  })
  if(!movie){
    return next (new appError('Movie is not extis'))
  }
  return res.status(200).json({
    status:'success',
    data: movie
  })
}

async function httpGetRandomMovieOrSeries (req ,res ,next) {
  const type = req.query
  const movie = await GetRandomMovieOrSeries(type);
  return res.status(200).json({
    status:'success',
    data:movie
  })
}

module.exports = {
  httpCreateMovie,
  httpGelAll,
  httpUpdateMovie,
  httpDeleteMovie,
  httpGetSingleMovie,
  httpGetRandomMovieOrSeries
}