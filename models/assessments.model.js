'use strict';

const mongoose = require('mongoose');
const db = require('../config/database').db;

const Schema = mongoose.Schema;

const AssessmentsSchema = new Schema({
	assessment_type: {
		type: String
	},
	date_created: {
		type: Date,
		default: Date.now
	},
	creator_id: {
		type: String,
		required: true
	},
	person_id: {
		type: String,
		required: true
	},
	observations: {
		type: [Schema.Types.Mixed]
	}
});

module.exports = db.model('Assessments', AssessmentsSchema);