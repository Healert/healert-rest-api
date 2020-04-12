'use strict';

const Screening = require('../models/screening.model');

async function saveUserScreening(payload){
    try {
        const newScreening = new Screening({
            user_id : payload.user_id,
            screening_dateTime : payload.payload.screening_dateTime,
            is_experiencing_fever : payload.payload.is_experiencing_fever,
            is_coughing : payload.payload.is_coughing,
            trouble_breathing : payload.payload.trouble_breathing,
            travelled_to_covidArea : payload.payload.travelled_to_covidArea,
            inContact_with_covid_person : payload.payload.inContact_with_covid_person,
            is_feeling_tired : payload.payload.is_feeling_tired,
            lost_sense_of_smell : payload.payload.lost_sense_of_smell
        });

        const result = await newScreening.save();
        return result;
    } catch (error) {
        return error;
    }
}

var screeningService = {
    saveUserScreening : saveUserScreening
}

module.exports = screeningService;

    