const express=require('express');
const asyncHandler=require("express-async-handler");
const Contact =require("../models/contactModels");
const validateToken = require('../middleware/validateTokenHandler');
const router=express.Router()

router.use(validateToken);
router.route("/").get(asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
    if(!contacts){res.status(404);throw new Error("contact not found");}
}));

router.route("/").post(asyncHandler(async(req,res)=>{
    const {name,email,phone}=req.body;
if(!name||!email||!phone){
    res.status(400);
    throw new Error("All fields are compulasary");
}
const contact= await Contact.create({
    name,
    email,
    phone,
    user_id:req.user.id
});
res.status(201).json(contact);
}));
    
router.route("/:id").get(asyncHandler(async(req,res)=>{

const contact=await Contact.findById(req.params.id);
if(!contact){
    res.status(404);throw new Error("contact not found");
}
    res.status(200).json(contact);
}));
router.route("/:id").put(asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){res.status(404);throw new Error("contact not found")}
   if(contact.user_id.toString()!==req.user.id){
    res.status(403);throw new Error("contact not found")
   }
   
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
}));
router.route("/:id").delete(asyncHandler(async(req,res)=>{
    const contact=await Contact.findByIdAndDelete(req.params.id);

    if(!contact){res.status(404);throw new Error("contact not found");}
    
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);throw new Error("contact not found")
       }
  
    res.status(200).json(contact);
}));
module.exports=router;