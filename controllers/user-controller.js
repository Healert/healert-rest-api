'use strict';

const userService = require('../services/user-service');

const userController = {
	saveUser: async (payload) => {
		try {
			return await userService.saveUser(payload);
		} catch (error) {
			return error;
		}
	},
	saveUserContact: async (payload) => {
		try {
			return await userService.saveUserContact(payload);
		} catch (error) {
			return error;
		}
	}
}

module.exports = userController;