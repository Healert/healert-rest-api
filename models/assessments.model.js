'use strict';

const mongoose = require('mongoose');

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

module.exports = mongoose.model('Assessments', AssessmentsSchema);