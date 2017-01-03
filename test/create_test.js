const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', () => {
    // true or false

    // model follow ths schema
    const joe = new User({ name: 'Joe' }); // Creating new User
    joe.save(); // Save instance to model database , return object
  });
});

