const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'DJoe' });
    joe.save()
    .then(() => done());
  });

  it('modal instance remove', (done) => {
    joe.remove()
    .then(() => User.findOne({ name: 'DJoe' }))
    .then((user) => {
      assert(user === null);
      done();
    });
  });

  it('class mthod remove', (done) => {
    // remove a bunch of records with some given criteria
    // delete all joe
    User.remove()
    .then(() => User.findOne({ name: 'DJoe' }))
    .then((user) => {
      assert(user === null);
      done();
    });
  });

  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'DJoe' })
    .then(() => User.findOne({ name: 'DJoe' }))
    .then((user) => {
      assert(user === null);
      done();
    });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
    .then(() => User.findOne({ name: 'DJoe' }))
    .then((user) => {
      assert(user === null);
      done();
    });
  });
});

