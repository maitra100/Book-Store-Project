const mongoose=require("mongoose");
const express=require("express");
const route=express.Router();
const {User}=require("../modules/user");
const Joi = require("joi");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const config=require("config");

route.post("/",async (req,res)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user) return res.status(404).send("Invalid email or password");
    const error=validate(req.body);
    if(error.error) return res.status(404).send(error.error.details[0].message);
    const result=await bcrypt.compare(req.body.password,user.password);
    if(!result) return res.status(404).send("Invalid email or password");
    const token=user.generateAuthtoken();
    res.send(token);
});

function validate(user){
    const schema=Joi.object({
        email:Joi.string().required().email(),
        password:Joi.string().required().min(5).max(1024),
    });
    return schema.validate({email:user.email,password:user.password});
};

module.exports=route;