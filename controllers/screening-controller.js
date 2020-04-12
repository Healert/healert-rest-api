const screeningService = require("../services/screening-service");

async function saveUserScreening(payload){
    try {
        return await screeningService.saveUserScreening(payload)
    } catch (error) {
        return error;
    }
}

var screeningController = {
    saveUserScreening : saveUserScreening
}

module.exports = screeningController;
