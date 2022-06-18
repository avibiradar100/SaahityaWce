const User=require('../models/userModel');
const Product=require('../models/productModel');
const {sendEmail} =require('../middleware/sendEmail');
const crypto=require("crypto")
const cloudinary = require("cloudinary");

exports.registerUser= async(req,res)=>{
    let myCloud;
    try {
         // cloudinar

        const { name, email, phone,password,avatar} = req.body;

        if(!name || !email || !phone || !password || !avatar){
            return  res.status(400).json({
                success:false,
                message:"Please Provide all values"
            })
        }
        let user= await User.findOne({email});
  
        if(user){

            return res.status(400).json({
                success:false,
                message:"User Already Exists"
            })
        }

        user= await User.findOne({phone});
  
        if(user){

            return res.status(400).json({
                success:false,
                message:"User Already Exists"
            })
        }

        myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        user=await User.create({
            name,
            email,
            phone,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        });

        const token= await user.generateToken();

        const options={
            expires:new Date(Date.now()+ 30*24*60*60*1000),
            httpOnly:true
        }

        res.status(201).cookie("token",token,options).json({
            success:true,
            message:"registration Done",
            user,
            token
        })

    } catch (error) {
        
        await cloudinary.v2.uploader.destroy(myCloud.public_id);  
        // console.log(error);  
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};

exports.loginUser= async(req,res)=>{

    try {

        const {email,password}=req.body;
       
        if (!email || !password) {
            return res.status(400).json({
                success:false,
                message:"please Enter Email / Phone and password"
            })
        }
        let user= await User.findOne({email:email}).select("+password");

        if(!user){
           user= await User.findOne({phone:email}).select("+password");
        }

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            })
        }

        const isPasswordMatched = await user.comparePassword(password);

        if(!isPasswordMatched){
            return res.status(400).json({
                success:false,
                message:"Invalid Email/Phone or Password"
            })
        }
        
        const token= await user.generateToken();
        const options={
            expires:new Date(Date.now()+ 30*24*60*60*1000),
            httpOnly:true
        }

        res.status(200).cookie("token",token,options).json({
            success:true,
            message:"login success",
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error
        })
    }
}

exports.logout=async(req,res)=>{
    try {
        const options={
            expires:new Date(Date.now()),
            httpOnly:true    
        }
        res.status(200).cookie("token",null,options).json({
            success:true,
            message:"Logged out"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updatePassword=async(req,res)=>{
    try {
        
        const user=await User.findById(req.user._id).select("+password");

        const {oldPassword,newPassword,confirmNewPassword}=req.body;

        if(!oldPassword || !newPassword || !confirmNewPassword){
            return  res.status(400).json({
                success:false,
                message:"Please Provide all values"
            })
        }

        const isMatch= await user.comparePassword(oldPassword);
        if(!isMatch){
             return  res.status(401).json({
                success:false,
                message:"Incorrect Old Password"
            })
        }

        if(newPassword !== confirmNewPassword){
             return  res.status(401).json({
                success:false,
                message:"newpassword and confirm password are not same"
            })
        }

        user.password=newPassword;
        await user.save();

        res.status(200).json({
            success:true,
            message:"Password Updated"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateProfile=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id);

        const {name,phone,email,avatar}=req.body;
        
        if(name){
             user.name=name
        }
        if(email){
             user.email=email
        }
        if(phone){
             user.phone=phone
        }
        if (avatar !== "") {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        
            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                    folder: "avatars",
                    width: 150,
                    crop: "scale",
            });

            user.avatar.public_id = myCloud.public_id;
            user.avatar.url = myCloud.secure_url;
        }

        await user.save();

        res.status(200).json({
            success:true,
            message:"Profile Updated"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.deleteMyProfile=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id);
        const totproducts=user.products;

        //Remove avatar data from cloudinary
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        await user.remove();

        // logout user after deleting profile
        const options={
            expires:new Date(Date.now()),
            httpOnly:true    
        }
        res.cookie("token",null,options);

        //delete all products of user
        for(let i=0;i<totproducts.length;i++){
            const product=await Product.findById(totproducts[i]);
            for(let j=0;j<product.images.length;j++)
                await cloudinary.v2.uploader.destroy(product.images[j].public_id);
            await product.remove();
        }   
        res.status(200).json({
            success:true,
            message:"Profile Deleted"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.myProfile=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id).populate("products");
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getUserProfile=async(req,res)=>{
     try {
        const user=await User.findById(req.params.id).populate("products");
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found" 
            })
        }

        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllUsers=async(req,res)=>{
    try {
        const users=await User.find({});
        
        res.status(200).json({
            success:true,
            users
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.forgotPassword=async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found" 
            })
        }

        const resetPasswordToken= user.getResetPasswordToken();

        await user.save();

        const resetUrl=`${req.protocol}://${req.get("host")}/api/v1/reset/password/${resetPasswordToken}`;

        const message=`Reset Your Password:\n\n ${resetUrl}`;

        try {
            await sendEmail({
                email:user.email,
                subject:"Reset Password",
                message,
            });

            res.status(200).json({
                success:true,
                message:`Email sent to ${user.email}` 
            })
        } catch (error) {
            user.resetPasswordToken= undefined;
            user.resetPasswordExpire= undefined;

            await user.save();

            res.status(500).json({
                success:false,
                message:error.message
            })
        }

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.resetPassword=async(req,res)=>{
    try {
        const resetPasswordToken= crypto.createHash("sha256").update(req.params.token).digest("hex");

        const user=await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt: Date.now()}
        });

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Token is invalid or expired"
            })
        }

        user.password=req.body.password;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save();

        res.status(200).json({
            success:true,
            message:"Password Reset Successfully"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//Admin Update Users Profile
exports.updateUserRole = async (req, res, next) => {
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            phone:req.body.phone,
            role:req.body.role,
        };

        await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            message: "Admin Updated User Role Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};

// admin delete user profile

exports.deleteUser = async (req, res, next) => {
    try {
        
        const user=await User.findById(req.params.id);
        const totproducts=user.products;

        //Remove avatar data from cloudinary
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);


        // logout user if it is admin 
        if(user.role==='admin'){
             const options={
                expires:new Date(Date.now()),
                httpOnly:true    
            }
            res.cookie("token",null,options);
        }

        await user.remove();

        //delete all products of user
        for(let i=0;i<totproducts.length;i++){
            const product=await Product.findById(totproducts[i]);
            for(let j=0;j<product.images.length;j++)
                await cloudinary.v2.uploader.destroy(product.images[j].public_id);
            await product.remove();
        }   
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
};
