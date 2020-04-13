const Wolf = require('../models/wolves.model');
module.exports = {
    getWolves: () => Wolf.find(),
    addWolf: data => new Wolf(data).save(),
    deleteWolf: wolfId => Wolf.findByIdAndRemove(wolfId)
}