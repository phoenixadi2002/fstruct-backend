const mongoose =  require('mongoose');
require('dotenv').config()
const {mongoDbUri, mongoDbName}  = require('./config/constants');

mongoose.connect(mongoDbUri, { maxPoolSize: 25, dbName: mongoDbName });
mongoose.connection.on('error', (err) => {
  console.log(err);
  throw new Error(`unable to connect to database: ${mongoDbUri}`);
});

mongoose.set('strictQuery', true);

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});

process.on('SIGTERM', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});
