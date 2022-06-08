const jwt=require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticated = async (req,res,next)=>{
    try {
        
        const {token}=req.cookies;

        if(!token){
            return res.status(403).json({
                success:false,
                message:"Please Logged in first."
            });
        }

        const decoded=await jwt.verify(token,process.env.JWT_SECRET);

        req.user=await User.findById(decoded._id);

        next();


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}