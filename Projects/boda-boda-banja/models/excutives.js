const mongoose = require( "mongoose" ),


    { Schema } = mongoose;

const executiveSchema = new Schema( {
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
    "currentDate": {
        "type": Date,
        "required": true
    },
    "password": {
        "type": String,
        "min": 6,
        "max": 12,
        "required": true
    },
    "email": {
        "type": String,
        "required": true,
        "unique": true
    },
    "mobileNumber": {
        "type": Number,
        "required": true
    },
    "telephoneNumber": {
        "type": Number,
        "required": true
    },
    "supervisorsName": {
        "type": String,
        "required": true
    },
    "workingDays": {
        "type": Number,
        "required": true
    },
    "dateOfBirth": {
        "type": Date,
        "required": true
    },
    "role":{
        "type": Number,
        "required": true,
        "default": 1
    }
    
} );


module.exports = mongoose.model( "executive", executiveSchema );