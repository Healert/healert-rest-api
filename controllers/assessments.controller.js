'use strict';

const Assessments = require('../models/assessments.model');

const assessmentsController = {
	saveAssessments: async (payload) => {
		try {
			const newAssessment = new Assessments({
				assessment_type: payload.assessment_type,
				creator_id: payload.creator_id,
				person_id: payload.person_id,
				observations: payload.observations
			});
			return await newAssessment.save();
		} catch (error) {
			return error;
		}
	},
	getAssessmentByCreator: async (creator_id) => {
		try {
			return await Assessments.find({
				creator_id: creator_id
			});
		} catch (error) {
			return error;
		}
	},
	getAssessmentByCreatorByType: async (creator_id, assessment_type) => {
		try {
			return await Assessments.find({
				creator_id: creator_id,
				assessment_type: assessment_type
			});
		} catch (error) {
			return error;
		}
	},
	getAssessmentByPersonId: async (person_id) => {
		try {
			return await Assessments.find({
				person_id: person_id
			});
		} catch (error) {
			return error;
		}
	},
	getAssessmentByPersonByType: async (person_id, assessment_type) => {
		try {
			return await Assessments.find({
				person_id: person_id,
				assessment_type: assessment_type
			});
		} catch (error) {
			return error;
		}
	},
	getAssessmentByAssessmentType: async (assessment_type) => {
		try {
			return await Assessments.find({
				assessment_type: assessment_type
			});
		} catch (error) {
			return error;
		}
	}
}

module.exports = assessmentsController;