const Movie = require('./movie.mongo');
const fs = require('fs')
const path = require('path');

async function loadAllMovies (){
  const movies = JSON.parse(fs.readFileSync(path.join(__dirname,'..','..','data', 'movies.json')));
  await Movie.create(movies);
}

async function GetAll(finalFilter , sortBy , limit , skip){
  return await Movie.find(finalFilter)
  .sort(sortBy)
  .limit(limit)
  .skip(skip)
}

async function CreateMovie(movie){
  const newMovie = new Movie(movie);
  await newMovie.save();
  return newMovie;
}

async function FindMovie (filter) {
  return await Movie.findOne(filter);
}


async function UpdateMovie(editMovie , id ){
  const movie = await Movie.findByIdAndUpdate(id , editMovie , {
    new : true,
    runValidators:true,
  })
  return movie
}

async function DeleteMovie(id ){
  await Movie.findByIdAndDelete(id)
}

async function GetRandomMovieOrSeries(type){
 
  let movie;
 if(type ==='serios') {  
  movie = await Movie.aggregate([
    {
      $match: {isSeries: true}},
    { $sample:{size:1}}
  ])

 }else {
   movie = await Movie.aggregate([
     {$match:{isSeries : false}},
     {$sample: {size: 1}}
   ])
 }

 return movie;
}

async function GetMoviesGroupsByRatings() {
  const movies = Movie.aggregate([

    {
      $match:{
        rating : {
          $gte:0
        }
      }
    },
    {
      $group:{
        _id:'$rating',
        Numbers: {$sum:1},
        Names: {$push:'$title'},   
      }
    },
    {
      $addFields:{
        ratings:'$_id',
      }
    },
    {
      $project:{
        _id:0
      }
    },
    {
      $sort:{
        ratings:-1
      }
    }
  ])
  return movies;
}

async function GetMoviesGroupsByGenre () {
  const movies = Movie.aggregate([
      {
        $unwind:'$genre'
      },
      {
        $group:{
          _id:'$genre',
          Numbers: {$sum:1},
          Names: {$push:'$title'},   
        }
      },
      {
        $addFields:{
          genre:'$_id',
        }
      },
      {
        $project:{
          _id:0
        }
      },
      {
        $sort:{
          ratings:-1
        }
      }
    ])
    return movies;
}


module.exports = {
  CreateMovie,
  FindMovie,
  UpdateMovie,
  GetAll,
  DeleteMovie,
  GetRandomMovieOrSeries,
  loadAllMovies,
  GetMoviesGroupsByRatings,
  GetMoviesGroupsByGenre

}


