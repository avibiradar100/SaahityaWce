const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },

    email: {
        type: String,
        required: [true, "Please enter your mail"],
        validate: [validator.isEmail, "Please enter your valid email"],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, "Please enter your phone"],
        minlength:[10,"Number must be 10 digit only"],
        maxlength:[10,"Number must be 10 digit only"]
    },
    role: {
        type: String,
        default: "user"
    },

    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "password should have more than 6 characters"]
    },

    avatar: {
        public_id:String,
        url:String
    },

    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,

});

userSchema.pre('save',async function(next){

    // only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) {
        next();
    }

     // hash the password along with our new salt
    this.password= await bcrypt.hash(this.password,10);
});


userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateToken=function(){
    return  jwt.sign({_id:this._id},process.env.JWT_SECRET);
}

userSchema.methods.getResetPasswordToken=function(){

    const resetToken=crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken= crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire=Date.now()+ 10*60*1000;

    return resetToken;
}

module.exports = mongoose.model("User", userSchema); 