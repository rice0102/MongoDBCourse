const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe;

  beforeEach((done) => {
    console.log('Reading');
    // joe is model instance
    joe = new User({ name: 'RJoe' });
    joe.save()
    .then(() => done());
  });

  it('finds all users with a name of joe', (done) => {
    // joe can use here
    User.find({ name: 'RJoe' })
    .then((users) => {
      // compare condition is object but must be string
      assert(users[0]._id.toString === joe._id.toString);
      done();
    });
  });
  it('find a user with a particular id', (done) => {
      User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'RJoe');
        done();
      });
  });
  // all model class can use find(every user name joe) and findOne(return first user match) function
});

