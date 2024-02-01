const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  postText: {
    type: String,
    required: true
  },
  image: {
    type: String
  },

  //this would store userID of user who made post
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    //to ref to the user who created post
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Array,            //in this array we will save userID of user's who have liked post
    default: []
  },


  // You might want to include a reference to the user who created the post
  // Add the following line if you want to reference the User model
  // user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
