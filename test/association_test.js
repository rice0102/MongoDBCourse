//const mongoose = require('mongoose');
const assert = require('assert'); // true or false
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'post content' });
    comment = new Comment({ content: 'YES' });

    joe.blogPosts.push(blogPost);
    /**
       in UserSchema
      ...
      blogPosts: [{
          type: Schema.Types.ObjectId,
          ref: 'blogPost'
      }]
     */
    blogPost.comments.push(comment);
    /**
      in BlogPostSchema
      ...
      comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
      }]
     */
    comment.user = joe;
    Promise.all([joe.save(), blogPost.save(), comment.save()])
    .then(() => done());
  });

  it('saves a relation between a user and blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
    });
  });

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(user.blogPosts[0].comments[0].content === 'YES');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');

        done();
    });
  });
});
