const {
  CreateMovie,
  FindMovie,
  UpdateMovie,
  GetAll,
  DeleteMovie,
  GetRandomMovieOrSeries,
  GetMoviesGroupsByRatings,
  GetMoviesGroupsByGenre
} = require('../../models/movie.models');
const appError = require('../../handelErros/class.handel.errors');
const filterFeaturs =require('../../services/class.filter');

/////////// Upload images to movie
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();
const multerFilter = (req , file , cb) => {
  if(file.mimetype.startsWith('image')) 
  {
    cb(null , true);
  }else {
    cb(new appError ('Not an image! please upload only images', 400 ) , false);
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

const uploadMoviesImages = upload.fields([
  {name: 'imageCover' , maxCount: 1},
  {name :'movieImage' , maxCount: 1},
])


const resizeMoviesImages =async (req , res ,next) => {
  if(req.files.imageCover) {
    
    req.body.imageCover =`movie-${req.params.movieid}-${Date.now()}.jpeg`
    await sharp(req.files.imageCover[0].buffer)
    .resize({width:2000 , height:1333})
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile(`public/images/movies/${req.body.imageCover}`)
  }

  if( req.files.movieImage) {

   req.body.movieImage =`movie-${req.params.movieid}-${Date.now()}.jpeg`
    await sharp(req.files.movieImage[0].buffer)
    .resize({width:300 , height:300})
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile(`public/images/movies/${req.body.movieImage}`)
  }

   next();
}

///////// Routes
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
    data: movies//.reverse()
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
  const type = req.query.type
  const movie = await GetRandomMovieOrSeries(type);
  return res.status(200).json({
    status:'success',
    data:movie
  })
}

async function httpGetMoviesGroupsByRatings(req , res,next){
  const movies = await GetMoviesGroupsByRatings();
  return res.status(200).json({
    status:'success',
    data: movies
  })
} 

async function httpGetMoviesGroupsByGenre(req , res,next){
  const movies = await GetMoviesGroupsByGenre();
  return res.status(200).json({
    status:'success',
    data: movies
  })
} 

module.exports = {
  httpCreateMovie,
  httpGelAll,
  httpUpdateMovie,
  httpDeleteMovie,
  httpGetSingleMovie,
  httpGetRandomMovieOrSeries,
  httpGetMoviesGroupsByRatings,
  httpGetMoviesGroupsByGenre,
  uploadMoviesImages,
  resizeMoviesImages
  
}