'use strict';

const mongoose = require('mongoose');
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000,
};

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/healert'
mongoose.set('useFindAndModify', false);
mongoose.connect(url, options).then( function() {
  console.log('MongoDB is connected',url);
})
  .catch( function(err) {
  console.log(err);
});

const db = mongoose.connection;
exports.db = db;
