const mongoose = require('mongoose');

const flightBookingSchema = {
    obj : {
        type:String,
        required:true
    },
}

const FlightDetail = mongoose.model('FlightDetail',flightBookingSchema);
module.exports = FlightDetail;