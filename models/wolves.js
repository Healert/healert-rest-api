'use strict';
const mongoose = require('mongoose');
const db = require('../config/database').db;
const Schema = mongoose.Schema;

const WolfSchema = new Schema({
	name: String
});

module.exports = db.model('Wolf', WolfSchema);
