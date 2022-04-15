const mongoose = require('mongoose');
const  validator = require('validator');
const userScheam = new mongoose.Schema({

  name: {
    type: String,
    required:[true, 'Please provide your name'],
    unique:true,
    minlength:[3, 'Name must be more or equal 3 chars'],
    maxlength:[20, 'Name must be less or equal 20 chars'],
  },
  email: {
    type: String,
    unique: true,
    required:[true, 'Please provide your email'],
    validate: [validator.isEmail , 'Please provide a valid email']
  },

  password: {
    type: String,
    required: [true,'Please provide a password'],
    min:[8 , 'Password must be more or equal 8 chars'],
  },
  passwordConfirm : {
    type: String,
    required: [true,'Please provide a password'],
    min:[8 , 'Password must be more or equal 8 chars'],
    validate: {
      validator: function(val) {
        return val ===  this.password
      },
      message :'passwords are not the same'
    }
  }
  ,
  passwordChangedAt : Date,
  passwordResetToken : String ,
  passwordResetExpires : Date,
  verificationToken: String,
}, {
   timestamps: true,
   toJSON: {virtuals : true},
   toObject:{virtuals : true}
})


const User=  mongoose.model('User' , userScheam);
module.exports = User;