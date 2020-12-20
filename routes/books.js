const express=require("express");
const route=express.Router();
const mongoose=require("mongoose");
const {Books,validatebook}=require("../modules/book");
const { Genre } = require("../modules/genre");

route.get("/",async (req,res)=>{
 const books=await Books.find();
 res.send(books);
});

route.get("/:id",async (req,res)=>{
 const books=await Books.findById(req.params.id);
 if(!books)
   return res.status(404).send("Book with the given id not found");
 res.send(books);
});

route.post("/",async (req,res)=>{
  const genres=await Genre.findById(req.body.genreId);
  if(!genres)
  return res.status(404).send("given genre not available");
   const book=await new Books({
     name:req.body.name,
     genre:{
       id:genres.id,
       name:genres.name,
     },
     author:req.body.author,
     price:req.body.price
   });
   const error=validatebook(book);
   if(error.error)
   return res.status(404).send(error.error.details[0].message);
   const result=await book.save();
   res.send(result);
});

route.put("/:id",async (req,res)=>{
  const genres=await Genre.findById(req.body.genreId);
  if(!genres)
  return res.status(404).send("given genre not available");
  const books=await Books.findByIdAndUpdate(req.params.id,{
    name:req.body.name,
    genre:{
      id:genres.id,
      name:genres.id,
    },
    author:req.body.author,
    price:req.body.price,
  },{new:true});
  res.send(books);
});

route.delete("/:id",async (req,res)=>{
  const books=await Books.findByIdAndRemove(req.params.id);
  res.send(books);

});





module.exports=route;