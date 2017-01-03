const mongoose = require('mongoose');
// test connection to mongodb

mongoose.connect('mongodb://localhost/users_test');
// create database call users_test
mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });

beforeEach((done) => {
  //done tell mocha can run next test
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test
    done();
  });
});
