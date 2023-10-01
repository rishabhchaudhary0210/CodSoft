const mongoose = require('mongoose');

const userSchema = {
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bookingID:{
        type:[String],
    },
}

const User = mongoose.model('User',userSchema);
module.exports = User;