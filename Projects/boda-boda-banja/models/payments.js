const mongoose = require( "mongoose" ),


    { Schema } = mongoose;

const payment = new Schema( {
    "name": {
        "type": String,
        "min": 5,
        "required": true
    },
    "phone": {
        "type": String,
        "required": true
    },
    "nationalId": {
        "type": String,
        "required": true
    },
    "autoMobile": {
        "type": String,
        "required": true
    },
    "amountPaid": {
        "type": Number,
        "required": true
    },
    "month": {
        "type": String,
        "required": true
    },
    "paymentDate": {
        "type": String,
        "required": true
    },
    "nextPaymentDate": {
        "type": String,
        "required": true
    }
    
} );


module.exports = mongoose.model( "payment", payment );