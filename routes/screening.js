'use strict';

const screeningController = require('../controllers/screening-controller');
const Boom = require('@hapi/boom');

module.exports = [
	{
		method: 'POST',
		config: {
			auth: 'firebase'
		},
		path: '/api/screening',
		handler: async (request, h) => {
			try {
                const payload = {
					user_id : request.user.user_id,
					payload : request.payload
				};
				const result = await screeningController.saveUserScreening(payload);
				const response = {
					statusCode: 200,
					type: 'Success',
					message: 'Screening information successfully saved',
					body: result
				}
				return h.response(response);
			} catch (error) {
				return Boom.badImplementation(error);
			}
		}
	}
];
