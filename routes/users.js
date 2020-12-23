const express=require("express");
const route=express.Router();
const mongoose=require("mongoose");
const {User,validateuser}=require("../modules/user");
const _=require("lodash");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const config=require("config");
const auth=require("../middleware/auth");

route.get("/me",auth,async (req,res)=>{
  const user=await User.findById(req.user.id).select("-password");
  res.send(user);
});

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
  const token=user.generateAuthtoken();
  const obj=_.pick(user,['id','name','email']);
  res.header("x-auth-token",token).send(obj);

});

module.exports=route;