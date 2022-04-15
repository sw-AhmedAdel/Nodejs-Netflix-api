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
  content:[Array],// will have all movies id like just hooro movies

}, {
  timestamps: true,
  toJSON:{virtuals: true},
  toObject:{virtuals: true },
})

const List = mongoose.model('List', listSchema);
module.exports = List;