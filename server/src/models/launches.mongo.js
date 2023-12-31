const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber : {
        type: Number,
        required: true
    },
    mission : {
        type: String,
        required: true
    },
    rocket : {
        type: String,
        required: true
    },
    launchDate : {
        type: Date,
        required: true
    },
    customers: [String],
    target : {
        type: String,
        required: true
    },
    upcoming: Boolean,
    success: {
        type: Boolean,
        required: true,
        default: true
    }
})

module.exports = mongoose.model('launch', launchesSchema);