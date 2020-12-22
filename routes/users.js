const express=require("express");
const route=express.Router();
const mongoose=require("mongoose");
const {User,validateuser}=require("../modules/user");
const _=require("lodash");
const bcrypt=require("bcrypt");

route.post("/",async (req,res)=>{
  let user=await User.findOne({email:req.body.email});
  if(user) return res.status(404).send("email already registered");
  user=await new User(_.pick(req.body,['name','email','password']))
  const error=validateuser(user);
  if(error.error)
  return res.status(404).send(error.error.details[0].message);
  const salt=await bcrypt.genSalt(10);
  user.password=await bcrypt.hash(user.password,salt);
  await user.save();
  const obj=_.pick(user,['id','name','email']);
  res.send(obj);

});

module.exports=route;