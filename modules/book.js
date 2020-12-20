const mongoose=require("mongoose");
const Joi = require("joi");
const {genreschema}=require("./genre");


const bookschema=mongoose.Schema({
   name:{
     type:String,
     minlength:2,
     maxlength:20,
     required:true,
   } ,
   genre:genreschema,
   author:{
       type:String,
       required:true,
   },
   price:{
       type:Number,
       required:true,
       min:100,
       max:1000,
   }
});

const Books=mongoose.model("Books",bookschema);

function validatebook(book)
{
    const schema=Joi.object({
        name:Joi.string().required().min(2).max(20),
        author:Joi.string().required(),
        price:Joi.number().required().min(100).max(1000),
    })
    return schema.validate({name:book.name,author:book.author,price:book.price});
}

module.exports.Books=Books;
module.exports.validatebook=validatebook;

