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
  },

  rating:{
    type:Number,
    default:0
  }


}, {
  timestamps:true,
  toJSON:{virtuals : true},
  toObject:{virtuals:true}
})

movieSchema.index({genre:1 , year:1 , rating: 1});
movieSchema.index({genre: 1});
movieSchema.index({year:1})
movieSchema.index({genre: 1 , year:1});


const Movie = mongoose.model('Movie' ,  movieSchema);
module.exports =Movie;