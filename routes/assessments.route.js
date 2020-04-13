'use strict';
const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const assessmentsController = require('../controllers/assessments.controller');

module.exports = [{
		method: 'POST',
		config: {
			auth: 'firebase',
			description: 'Save Assessments ',
			notes: 'Returns the newly created assessments',
			tags: ['api'],
			validate: {
				payload: Joi.object({
					assessment_type: Joi.string().required().description('Assessment Type'),
					person_id: Joi.string().required().description('Person Id'),
					observations: Joi.array().required().description('Observations')
				}),
				failAction: async (request, h, err) => {
					throw err;
				}
			}
		},
		path: '/api/assessments',
		handler: async (request, h) => {
			try {
				const payload = request.payload;
				payload.creator_id = request.user.user_id;
				const output = await assessmentsController.saveAssessments(payload);
				const response = {
					type: 'Success',
					message: 'Assessments saved successfully',
					body: output
				}
				return h.response(response);

			} catch (error) {
				return Boom.badImplementation();
			}
		}
	},
	{
		method: 'GET',
		config: {
			auth: 'firebase',
			description: 'Get Assessments by the creator',
			notes: 'Returns assessments by creator',
			tags: ['api']
		},
		path: '/api/assessments/creator',
		handler: async (request, h) => {
			try {
				const creator_id = request.user.user_id;
				const output = await assessmentsController.getAssessmentByCreator(creator_id);
				const response = {
					type: 'Success',
					message: 'Assessments fetched successfully',
					body: output
				}
				return h.response(response);

			} catch (error) {
				return Boom.badImplementation();
			}
		}
	},
	{
		method: 'GET',
		config: {
			auth: 'firebase',
			description: 'Get Assessments by the creator and type',
			notes: 'Returns assessments by creator and type',
			tags: ['api'],
			validate: {
				query: Joi.object({
					assessment_type: Joi.string().required().description('Assessment Type')
				}),
				failAction: async (request, h, err) => {
					throw err;
				}
			}
		},
		path: '/api/assessments/creator-type',
		handler: async (request, h) => {
			try {
				const creator_id = request.user.user_id;
				const assessment_type = request.query.assessment_type;
				const output = await assessmentsController.getAssessmentByCreatorByType(creator_id, assessment_type);
				const response = {
					type: 'Success',
					message: 'Assessments fetched successfully',
					body: output
				}
				return h.response(response);

			} catch (error) {
				return Boom.badImplementation();
			}
		}
	},
	{
		method: 'GET',
		config: {
			auth: 'firebase',
			description: 'Get Assessments by person id',
			notes: 'Returns assessments by person id',
			tags: ['api'],
			validate: {
				query: Joi.object({
					person_id: Joi.string().required().description('Person Id')
				}),
				failAction: async (request, h, err) => {
					throw err;
				}
			}
		},
		path: '/api/assessments/person',
		handler: async (request, h) => {
			try {
				const person_id = request.query.person_id;
				const output = await assessmentsController.getAssessmentByPersonId(person_id);
				const response = {
					type: 'Success',
					message: 'Assessments fetched successfully',
					body: output
				}
				return h.response(response);

			} catch (error) {
				return Boom.badImplementation();
			}
		}
	},
	{
		method: 'GET',
		config: {
			auth: 'firebase',
			description: 'Get Assessments by the person and type',
			notes: 'Returns assessments by person and type',
			tags: ['api'],
			validate: {
				query: Joi.object({
					person_id: Joi.string().required().description('Person Id'),
					assessment_type: Joi.string().required().description('Assessment Type')
				}),
				failAction: async (request, h, err) => {
					throw err;
				}
			}
		},
		path: '/api/assessments/person-type',
		handler: async (request, h) => {
			try {
				const person_id = request.query.person_id;
				const assessment_type = request.query.assessment_type;
				const output = await assessmentsController.getAssessmentByPersonByType(person_id, assessment_type);
				const response = {
					type: 'Success',
					message: 'Assessments fetched successfully',
					body: output
				}
				return h.response(response);

			} catch (error) {
				return Boom.badImplementation();
			}
		}
	},
	{
		method: 'GET',
		config: {
			auth: 'firebase',
			description: 'Get Assessments by the assessment type',
			notes: 'Returns assessments the assessment type provided',
			tags: ['api'],
			validate: {
				query: Joi.object({
					assessment_type: Joi.string().required().description('Assessment Type')
				}),
				failAction: async (request, h, err) => {
					throw err;
				}
			}
		},
		path: '/api/assessments/type',
		handler: async (request, h) => {
			try {
				const assessment_type = request.query.assessment_type;
				const output = await assessmentsController.getAssessmentByAssessmentType(assessment_type);
				const response = {
					type: 'Success',
					message: 'Assessments fetched successfully',
					body: output
				}
				return h.response(response);

			} catch (error) {
				return Boom.badImplementation();
			}
		}
	}
];