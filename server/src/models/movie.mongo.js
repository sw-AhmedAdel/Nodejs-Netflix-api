const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  
  title:{
    type:String,
    required:[true,'Movie must has a title'],
  },
  desc: {
    type:String,
    required:[true,'Movie must has a desc'],
  },
  imageCover: {
    type:String,
    required:[true,'Movie must has a cover image'],
  },
  imageTitle: {
    type:String,
  },
  movieImage:{
    type: String,
    required:[true,'Movie must has an Image'],
  },
  trailer:{
    type:String,
    required:[true,'Movie must has an image'],
  },
  video:{
    type:String,
    required:[true,'Movie must has an video'],
  },
  year:{
    type:String,
    required:[true,'Movie must has an year'],
  },
  limit:{
    type:String,
    required:[true,'Movie must has an limit'],
  },
  genre:{
    type:String,
    required:[true,'Movie must has an genre'],
  },
  isSeries:{
    type:Boolean,
    default: false
  }


}, {
  timestamps:true,
  toJSON:{virtuals : tue},
  toObject:{virtuals:true}
})

const Movie = mongoose.model('Movie' ,  movieSchema);
module.exports =Movie;