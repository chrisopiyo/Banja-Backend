const mongoose = require( "mongoose" ),


    { Schema } = mongoose;

const autoMobile = new Schema( {
    "name": {
        "type": String,
        "min": 5,
        "required": true
    },
    "price": {
        "type": String,
        "required": true
    },
    "quantity": {
        "type": Number,
        "required": true
    },
    "downPayment": {
        "type": Number,
        "required": true
    },
    "duration": {
        "type": Number,
        "required": true
    }
    
} );


module.exports = mongoose.model( "automobile", autoMobile );