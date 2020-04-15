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
	},
	getUsers: async () => {
		try {
			return await userService.getUsers();
		} catch (error) {
			return error;
		}
	},
	getUserById: async (user_id) => {
		try {
			return await userService.getUserById(user_id);
		} catch (error) {
			return error;
		}
	},
	getUsersByCreator: async (creator_id) => {
		try {
			return await userService.getUsersByCreator(creator_id);
		} catch (error) {
			return error;
		}
	}
}

module.exports = userController;