'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ScreeningSchema = new Schema({
    user_id: {
		type: String,
		required: true
	},
	screening_dateTime: {
        type : Date,
        default : Date.now
    },
    is_experiencing_fever : {
        type : Boolean,
        default : false
    },
    is_coughing : {
        type : Boolean,
        default : false
    },
    trouble_breathing : {
        type : Boolean,
        default : false
    },
    travelled_to_covidArea : {
        type : Boolean,
        default : false
    },
    inContact_with_covid_person : {
        type : Boolean,
        default : false
    },
    is_feeling_tired : {
        type : Boolean,
        default : false
    },
    lost_sense_of_smell : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('Screening', ScreeningSchema);
