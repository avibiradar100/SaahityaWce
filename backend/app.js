const express = require("express");
const cookieParser=require('cookie-parser');
const app = express();

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config({path:"backend/config/config.env"});
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


/// IMPORT ROUTES
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use('/api/v1',product);
app.use('/api/v1',user);

module.exports=app;