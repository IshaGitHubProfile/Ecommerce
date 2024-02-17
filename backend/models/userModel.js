const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Name can not be greater than 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should have more than 8 characters"],
        select:false
    },
    avatar : {
        public_id : {
            type:String,
            required:true
        },
        url :{
            type:String,
            required:true
        },
    },
    role:{
        type:String,
        default:"user",
    },
    createdAt : {
        type: Date,
        default: Date.now(),
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

//hash the password before saving it in database
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) {   //if the password is not modifies then there is no need to hash it again unecessarily
        next();
    }
    this.password = await bcrypt.hash(this.password,10); //10 is the complexity to which password must be hashed
})

//jwt token 
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{  //process.env.JWT_SECRET --> secret key used to sign the JWT
        expiresIn:process.env.JWT_EXPIRE,
    });
};

//compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

//generating password reset token
userSchema.methods.getResetPasswordToken = function () { //This line adds a method called getResetPasswordToken to the userSchema.methods object. 
    const resetToken = crypto.randomBytes(20).toString("hex"); //This line generates a random token of 20 bytes using crypto.randomBytes() function. The toString("hex") method converts these bytes into a hexadecimal string, making it suitable for use as a token.

    //hashing and adding resetPasswordtoken to userSchema
    this.resetPasswordToken = crypto
    .createHash("sha256")  //creates a Hash object using the SHA-256 algorithm. 
    .update(resetToken) //updates the hash with the generated token
    .digest("hex");  //computes the digest of the hash as a hexadecimal string.

    this.resetPasswordExpire = Date.now() + 15*60*1000;  //the token will expire in 15 minutes
    return resetToken;
}
module.exports=mongoose.model("User",userSchema);