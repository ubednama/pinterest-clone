const mongoose = require('mongoose');

const plm = require("passport-local-mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/pinterest")


const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
    //this would be to connect posts with user
  }],
  dp: {
    type: String, // Assuming profile picture is stored as a URL or file Path
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  }
});


userSchema.plugin(plm)

const User = mongoose.model('User', userSchema);

module.exports = User;