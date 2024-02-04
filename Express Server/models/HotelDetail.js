const mongoose = require('mongoose');

const hotelDetailSchema = {
    hotelId : {
        type : String,
        required : true,
        unique : true
    },
    obj : {
        type : String, 
        required : true
    }
}
const HotelDetail = mongoose.model("HotelDetail", hotelDetailSchema);
module.exports = HotelDetail;