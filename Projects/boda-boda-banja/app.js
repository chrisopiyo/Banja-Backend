const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash")
const jwt = require("jsonwebtoken")
const cors = require('cors');

//Middleware
const authMiddle = require("./models/helpers/auth")

const executiveModel = require("./models/excutives");
const customerModel = require("./models/customers");
const autoMobileModel = require("./models/automobile");
const paymentModel = require("./models/payments");

const app = express();
app.use(cors());


/*. CREATING MONGO DB CONNECTION.*/
// mongoose.connect("mongodb://localhost/executive")
mongoose.connect("mongodb://heroku_3nrlbs3b:k466d6of5m9dqiusmtdjfir6dj@ds335275.mlab.com:35275/heroku_3nrlbs3b")

/*.INITIALIZING BODY PARSER.*/

app.use( bodyParser.urlencoded( { "extended": true } ) );
app.use( bodyParser.json() );

/*. CREATING AN EXECUTIVE.*/

app.post("/api/executives", async (req, res) => {

    console.log(req.body)
    
    const newExecutive = await req.body;

    await executiveModel.create(newExecutive).then((executive) => {
        res.status(200).send({
            "executive": executive
        })
    },(err) => {
        res.send(err)
    })
})

/*. LOGIN REQUEST SALES-MANAGER.*/

app.post("/excutives/login", async (req, res) => {
    console.log(req.body)

    const password = req.body.password;
    const email = req.body.email;


    const executive = await executiveModel.findOne( { email: email } );
    if( !executive ) {
        return res.status( 400 ).send( {"error": "Invalid credentials"} );
    }

    if( password != executive.password ) {
        return res.status( 400 ).send({"error": "Invalid credentials"} );
    }
    
    const accessToken = jwt.sign({email: email, role:executive.role}, "sample");
    res.status(200).send({
        "message": "Success",
        "token": accessToken
    })

})

/*. CREATING A CUSTOMER.*/

app.post("/api/customers", async (req, res) => {

    const newCustomer = await req.body;
    console.log(newCustomer);

    await customerModel.create(newCustomer).then((customer) => {
        res.json({
            customer
        })
    },(err) => {
        res.send(err)
    })
})

/*. GET CUSTOMERS .*/

app.get("/api/customers", async (req, res) => {
    customerModel.find({}).then(
        executives => {
            res.json(executives)
        }, 
        err => {
            res.send(err)
        }
    )
})

/*. GET EXECUTIVES .*/

app.get("/api/executives", async (req, res) => {
    executiveModel.find({}).then(
        executives => {
            res.json(executives)
        }, 
        err => {
            res.send(err)
        }
    )
})

/*. DELETE EXECUTIVES.*/

app.delete("/api/executives/:id", (req, res) => {
    executiveModel.findByIdAndRemove({ _id: req.params.id }, (err, removed) => {
      if (err) {
        res.status(400).send("user not updated");
      } else {
        res.json({
            "status" : "deleted",
            "deleted" : "true"
        });
      }
    });
  });
  

/*. LOGIN REQUEST CUSTOMERS*/

app.post("/customer/login", async (req, res) => {
    const password = req.body.password;
    const email = req.body.email;


    const customer = await customerModel.findOne( { "email": email } );
    if( !customer ) {
        return res.status( 400 ).send({"error" : "Incorrect credentials"});
    }

    if( password != customer.password ) {
        return res.status( 400 ).send({"error" : "Incorrect credentials"} );
    }
    customer
    res.send({
        "message": "Success",
        "Status": "logged In",
        "token": accessToken
    })

})

/*. POST REQUEST FOR AUTO-MOBILE.*/

app.post("/api/automobile", async (req, res) => {

    const newAutoMobile = await req.body;

    await autoMobileModel.create(newAutoMobile).then((autoMobile) => {
        res.json({
            autoMobile
        })
    },(err) => {
        res.send(err)
    })
})

/*. POST REQUEST FOR LOAN REPAYMENT.*/

app.post("/api/payment", async (req, res) => {

    const newPayment = await req.body;

    await paymentModel.create(newPayment).then((newPayment) => {
        res.json({
            newPayment
        })
    },(err) => {
        res.send(err)
    })
})

// GET PAYMENTS
app.get("/api/payments", async (req, res) => {
    paymentModel.find({}).then(
        payment => {
            res.json(payment)
        }, 
        err => {
            res.send(err)
        }
    )
})

// Get Customer Payments Based on His Phone Number

app.get("/api/payment/:phone", async (req, res) => {
    const phone = req.params.phone
    paymentModel.find({phone}).then(
        customer => {
            res.json(customer);
        }, 
        err => {
            res.send(err)
        }
    )
})


/*. GET AUTO-MOBILES .*/

app.get("/api/automobiles", async (req, res) => {
    autoMobileModel.find({}).then(
        autoMobile => {
            res.json(autoMobile)
        }, 
        err => {
            res.send(err)
        }
    )
})

/*. GET AUTOMOBILE.*/

app.get("/api/automobile/:name", async (req, res) => {
    const name = req.params.name
    autoMobileModel.find({name}).then(
        autoMobile => {
            res.json(autoMobile)
        }, 
        err => {
            res.send(err)
        }
    )
})

/*. UPDATE CUSTOMER.*/

app.put("/api/customer/:phone", async (req, res) => {
    const phoneNumber = req.params.phone
    const data = req.body
    customerModel.find({phoneNumber}).then(
        customer => {
            _.merge(customer[0], data);
            customer[0].save((err,saved)=>{
                if(err){
                    console.log(err);
                }else{
                    res.json(saved)
                }
            })

        }, 
        err => {
            res.send(err)
        }
    )
})

// Get Customer Based on His Phone Number

app.get("/api/customer/:phone", async (req, res) => {
    const phoneNumber = req.params.phone
    customerModel.find({phoneNumber}).then(
        customer => {
            res.json(customer);
        }, 
        err => {
            res.send(err)
        }
    )
})

/*. LOADING THE SERVER ON PORT 3000.*/

const PORT = process.env.PORT || 3000;

app.listen( PORT, () => {
    console.log( `App running on port ${PORT}` );
} );