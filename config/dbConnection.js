const mongoose=require('mongoose');
const server='127.0.0.1:27017';
const database='gymb';
const connectDB=async()=>{
    try{
        await mongoose.connect(`mongodb://${server}/${database}`);
        console.log('connected');
    }
    catch(err){
        console.log('failed');
    }


};
module.exports=connectDB;