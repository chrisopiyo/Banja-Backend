const jwt = require("jsonwebtoken");


const auth = (req,res,next) => {
    const token = req.headers.authorization.split(" ");
    try{
        if (token[0] === "Bearer" && jwt.verify(token[1],"thisisthetoken")){
            next()
        }
    } catch (err){
        if(err.name === "JsonWebTokenError"){
            res.sendStatus(401)
        }else{
            res.sendStatus(401)
        }
    }
}

module.exports = auth;