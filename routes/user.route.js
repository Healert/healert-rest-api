'use strict';
const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const userController = require('../controllers/user-controller');

const User = require('../models/user.model');


module.exports = [
	{
		method: ['POST'],
		config: {
			auth: 'firebase',
			description: 'Save new user',
			notes: 'Returns the newly created user object',
			tags: ['api'],
			validate: {
				payload: Joi.object({
					first_name: Joi.string().description('First Name'),
					last_name: Joi.string().description('Last Name'),
					dob: Joi.date().required().description('Date of birth'),
					phone_number: Joi.string().required().description('Phone Number'),
					gender: Joi.string().required().description('Gender')
				}),
				failAction: async (request, h, err) => {
					throw err;
				}
			}
		},
		path: '/api/user',
		handler: async (request, h) => {
			try {
				const payload = request.payload;
				payload.creator_id = request.user.user_id;
				const result = await userController.saveUser(payload);
				const response = {
					type: 'Success',
					message: 'User saved successfully',
					body: result
				}
				return h.response(response);

			} catch (error) {
				return Boom.badImplementation();
			}
		}
	},
	{
		method: ['POST'],
		config: {
			auth: 'firebase',
			description: 'Save new user',
			notes: 'Returns the newly created user object',
			tags: ['api'],
			validate: {
				payload: Joi.object({
					first_name: Joi.string().description('First Name'),
					last_name: Joi.string().description('Last Name'),
					dob: Joi.date().required().description('Date of birth'),
					phone_number: Joi.string().required().description('Phone Number'),
					gender: Joi.string().required().description('Gender')
				}),
				failAction: async (request, h, err) => {
					throw err;
				}
			}
		},
		path: '/api/user/{user_id}',
		handler: async (request, h) => {
			try {
				const payload = request.payload;
				payload.user_id = request.params.user_id
				payload.creator_id = request.user.user_id;
				const result = await userController.saveUserContact(payload);
				const response = {
					type: 'Success',
					message: 'User saved successfully',
					body: result
				}
				return h.response(response);

			} catch (error) {
				return Boom.badImplementation();
			}
		}
	}
];