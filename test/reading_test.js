const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
    .then(() => done());
  });

  it('finds all users with a name of joe', (done) => {
    // joe can use here
    User.find({ name: 'Joe' })
    .then((users) => {
      // compare condition is object must be string
      assert(users[0]._id.toString === joe._id.toString);
      done();
    });
  });
  // all model class can use find(every user name joe) and findOne(return first user match) function
});
