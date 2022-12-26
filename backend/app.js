const express = require("express");
const cookieParser=require('cookie-parser');
const app = express();
const fileUpload = require("express-fileupload");
const path = require("path");

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config({path:"backend/config/config.env"});
}
app.use(fileUpload());

app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser())
// app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use(express.urlencoded({extended: true }));



/// IMPORT ROUTES
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);
console.log(process.cwd())

// app.get("*", (req, res) => {

//   res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  
// });

module.exports=app;