const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"please add the user name"],
        
    },
    email:{
        type:String,
        reuired:[true,"please add user email and password"],
    unique:[true,"email address already taken"],
    },
    password:{
        type:String,
        required:[true,"pleasr add user password"],
    },
},
{
    timestamps:true,
});
module.exports=mongoose.model("User",userSchema);