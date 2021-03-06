const express=require("express");
const route=express.Router();
const mongoose=require("mongoose");
const {Genre,validategenre}=require("../modules/genre");
const auth=require("../middleware/auth");
const admin=require("../middleware/admin");

route.get("/",async (req,res)=>{
  try{
  const genres=await Genre.find().sort({name:1});
  res.send(genres);
  }
  catch(ex){
    next();
  }
});

route.get("/:id",async(req,res)=>{
  const genres=await Genre.findById(req.params.id);
  res.send(genres);
});

route.post("/",auth,async (req,res)=>{
  const genre=await new Genre({
      name:req.body.name,
  });
  const error=validategenre(genre);
  if(error.error)
  return res.send(error.error.details[0].message);
  const result=await genre.save();
  res.send(genre);
});

route.put("/:id",async (req,res)=>{
  const genre=await Genre.findByIdAndUpdate(req.params.id,{
      name:req.body.name,
  },{new:true});
  res.send(genre);
});

route.delete("/:id",[auth,admin],async (req,res)=>{
  const genre=await Genre.findByIdAndRemove(req.params.id);
  res.send(genre);
});

module.exports=route;