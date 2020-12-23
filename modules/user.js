const mongoose=require("mongoose");
const Joi=require("joi");
const jwt=require("jsonwebtoken");
const config=require("config");

const userschema=mongoose.Schema({
    name:{
        type:String,
        min:5,
        max:50,
        required:true,
    },
    email:{
        type:String,
        min:5,
        max:50,
        required:true,
        unique:true
    },
    password:{
        type:String,
        min:5,
        max:1024,
        required:true,
    },
    isAdmin:Boolean
});

userschema.methods.generateAuthtoken=function(){
    const token=jwt.sign({id:this.id,isAdmin:this.isAdmin},config.get("jwtPrivatekey"));
    return token;
}

const User=mongoose.model("User",userschema);

function validateuser(user){
    const schema=Joi.object({
        name:Joi.string().required().min(5).max(50),
        email:Joi.string().required().min(5).max(50).email(),
        password:Joi.string().required().min(5).max(1024),
    });
    return schema.validate({name:user.name,email:user.email,password:user.password});
}

module.exports.User=User;
module.exports.validateuser=validateuser;