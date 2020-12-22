const mongoose=require("mongoose");
const Joi=require("joi");

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
});

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