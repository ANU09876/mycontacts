const express = require('express');
const connectDb=require("./config/dbConnection");
const dotenv=require("dotenv").config();
const app = express();
const errorHandler=require("./middleware/errorHandler");
const port=process.env.PORT||5000;
connectDb();
app.use(express.json());//used for middleware parsing json send from user through post request
app.use("/api/contacts",require("./routes/contactRoutes"))
app.use("/api/users",require("./routes/userRoutes"))
app.use(errorHandler);//whenevr middleware bnaoge to use it 
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});
