const express=require('express');
const jwt=require("jsonwebtoken");
const bcrypt =require("bcrypt");
const asyncHandler=require("express-async-handler");
const User =require("../models/userModel")
const router=express.Router();
const validateTokenHandler=require("../middleware/validateTokenHandler");
router.route("/register").post(asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){res.status(400);throw new Error("user already exists")}
    const hashedPssword=await bcrypt.hash(password,10);
    const user=await User.create({
        username,
        email,
        password:hashedPssword,
    });
    if(user)res.status(201).json({_id:user.id,email:user.email});
else{
    res.status(400);
    throw new Error("user data is not valid");
}
}));
router.route("/loginuser").post(asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user=await User.findOne({email});
     if(user&&(await bcrypt.compare(password,user.password))){
     const accesstoken=jwt.sign({
        user:{
            username:user.username,
            email:user.email,
            id:user.id,
        },
     },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"30m"});
     res.status(200).json({accesstoken});
    }

    else{
        res.status(401)
        throw new Error("email or password is invalid")
    }

   
}));
router.route("/current").get( validateTokenHandler,asyncHandler(async(req,res)=>{
  
res.json(req.user);
}));

module.exports=router;