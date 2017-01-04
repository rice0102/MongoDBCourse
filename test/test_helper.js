const mongoose = require('mongoose');
// test connection to mongodb

mongoose.Promise = global.Promise; // es6 Promise

before((done) => {
  mongoose.connect('mongodb://localhost/users_test'); // create database call users_test
  console.log('before');
  mongoose.connection
    .once('open', () => { done(); console.log('open'); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
}); // before run just one time, wait successfully connection from mongo

beforeEach((done) => {
  //callback function done tell mocha can run next test
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test
    done();
  });
});
