const mongoose = require('mongoose');
const listSchema = new mongoose.Schema({
  
  title:{
    type:String,
    required:[true,'Movie must has a title'],
  },
  type: { // movies or series 
    type:String,
    required:[true,'Movie must has a desc'],
  },
  genre: {
    type:String,
    required:[true,'Movie must has a cover image'],
  },
  content:[
  {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'Movie',  
  }
],// will have all movies id like just hooro movies

}, {
  timestamps: true,
  toJSON:{virtuals: true},
  toObject:{virtuals: true },
})

listSchema.pre(/^find/ , function(next) {
  this.populate({
    path:'content',
    select:'title movieImage rating isSeries'
  })
  next();
})

 

const List = mongoose.model('List', listSchema);
module.exports = List;