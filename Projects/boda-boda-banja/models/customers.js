const mongoose = require( "mongoose" ),


    { Schema } = mongoose;

const customerSchema = new Schema( {
    "firstName": {
        "type": String,
        "min": 5,
        "required": true
    },
    "lastName": {
        "type": String,
        "min": 5,
        "required": true
    },
    "nationality": {
        "type": String,
        "min": 6,
        "max": 12,
        "required": true
    },
    "dateOfBirth": {
        "type": Date,
        "required": true
    },
    "phoneNumber": {
        "type": Number,
        "required": true
    },
    "nationalId": {
        "type": String,
        "required": true,
        "min": 13
    },
    "vehicleType": {
        "type": String,
        "required": true
    },
    "refereeName": {
        "type": String,
        "required": true
    },
    "refereeContact": {
        "type": Number,
        "required": true
    },
    "refereeOccupation": {
        "type": String,
        "required": true
    },
    "refereeDateOfBirth": {
        "type": Date,
        "required": true
    },
    "downPayment": {
        "type": String,
        "required": true
    },
    "otherLoans": {
        "type": String,
        "required": true
    },
    "stageName": {
        "type": String,
        "required": true
    },
    "LConeName": {
        "type": String,
        "required": true
    },
    "LCthreeName": {
        "type": String,
        "required": true
    },
    "status": {
        "type": String,
        "required": true
    },
    "totalAmount": {
        "type": Number,
        "required": true
    },
    "startDay": {
        "type": String,
        "required": true
    },
    "lastDay": {
        "type": String,
        "required": true
    },
    "latestPaymentDate": {
        "type": String,
        "required": false
    }


    
} );


module.exports = mongoose.model( "customer", customerSchema );