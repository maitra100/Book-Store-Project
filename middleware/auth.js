const jwt=require("jsonwebtoken");
const config = require('config');

function auth(req,res,next){
    const token=req.header("x-auth-token");
    if(!token) return res.status(401).send("acces denied,no token provided");
    try{
        const decoded=jwt.verify(token,config.get("jwtPrivatekey"));
        req.user=decoded;
        next();
    }
    catch(ex){
        res.status(400).send("Wrong token provided");
    }
}

module.exports = auth;