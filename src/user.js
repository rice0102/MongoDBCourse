const mongoose = require('mongoose');
const PostSchema = require('./post');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
        validator: (name) => name.length > 2,
        message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('remove', function(next) {
  // next tell mongoose all done can go next middleware
  const BlogPost = mongoose.model('blogPost');
 //here this === joe
 // if the id in this record and remove it.
 BlogPost.remove({ _id: { $in: this.blogPosts } })
 .then(() => next());
});

// create model
const User = mongoose.model('user', UserSchema);

/*
  if mongodb do not have 'user' collection.
  it will create 'user' collection
  then collection = user
*/

// export only models
module.exports = User;
