const mongoose=require("mongoose");
const contactSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        reuired:true,
        ref:"User",
    },
    name:{
        type:String,
        required:[true,"please asdd the contact number"],
    },
    email:{
        type:String,
        required:[true,"please add email adress"]
    },
    phone:{
        type:String,
        required:[true,"please add contact number"],
    },
},
{
    timestamps:true,
}
);
module.exports=mongoose.model("Contact",contactSchema);