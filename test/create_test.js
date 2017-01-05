const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', (done) => {
    // model follow ths schema
    const joe = new User({ name: 'CJoe' });

    joe.save()
    .then(() => {
      assert(!joe.isNew);
      done();
    });
    // Save instance to model database , return Promise
  });
});

