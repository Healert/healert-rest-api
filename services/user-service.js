'use strict';

const User = require('../models/user.model');

const userService = {
	saveUser: async (payload) => {
		try {
			const newUser = new User({
				creator_id: payload.creator_id,
				first_name: payload.first_name,
				last_name: payload.last_name,
				dob: payload.dob,
				phone_number: payload.phone_number,
				gender: payload.gender
			});
			return await newUser.save();
		} catch (error) {
			return error;
		}
	},
	saveUserContact: async (payload) => {
		try {
			const newUser = new User({
				creator_id: payload.creator_id,
				first_name: payload.first_name,
				last_name: payload.last_name,
				dob: payload.dob,
				phone_number: payload.phone_number,
				gender: payload.gender,
				parent_id: payload.user_id

			});
			const result = await newUser.save();

			let objectToUpdate = await User.find({ _id: payload.user_id });
			objectToUpdate[0].people_ids.push(result._id);
			
			return await objectToUpdate[0].save();
		} catch (error) {
			return error;
		}
	}
}

module.exports = userService;