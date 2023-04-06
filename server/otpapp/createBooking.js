const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name : {
            type: String,
            require: true
    },
    email : 'String',
    mobileNumber : {
            type: Number,
            require: true
        },
    gymlocation : 'String',
    membershipType: 'String',
    startDate:'Date',
    // verificationotp : 'String',
    // isOTPVerfied : Boolean
})
const bookingmodel = mongoose.model('bookingmodel',schema);
module.exports = bookingmodel;
