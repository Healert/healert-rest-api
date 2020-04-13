'use strict';
const mongoose = require('mongoose');
const db = require('../config/database').db;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  creator_id: {
    type: String,
    required: true
  },
  first_name: String,
  last_name: String,
  dob: {
    type: Date,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Female', 'Male'],
    required: true
  },
  people_ids: {
    type: Array,
    default: []
  },
  parent_id: String
});

module.exports = db.model('User', UserSchema);
