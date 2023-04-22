const {constants}=require("../constants");
const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode?res.statusCode:500;
switch(statusCode){
case constants.VALIDATION_ERROR:
res.json({
    title:"validation failed",
    message:err.message,
    stackTrace:err.stack,
});
break;
case constants.NOT_FOUND:
res.json({
    title:"Not found",
    message:err.message,
    stackTree:err.stack,
});

case constants.UNAUTHORIZED:
res.json({
    title:"Not found",
    message:err.message,
    stackTree:err.stack,
});
case constants.FORBIDDEN:
res.json({
    title:"Not found",
    message:err.message,
    stackTree:err.stack,
});
case constants.SERVER_ERROR:
res.json({
    title:"Not found",
    message:err.message,
    stackTree:err.stack,
});
default:break;
}

};
module.exports=errorHandler;