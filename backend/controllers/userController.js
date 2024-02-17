const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//register a user
exports.registerUser = catchAsyncError(async(req,res,next)=>{
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder:"avatars",
        width:150,
        crop:"scale",
    });

    const {name,email,password}=req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar : {
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        },
    });

    sendToken(user,201,res);
});

//login a user 
exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }
    const user = await User.findOne({email}).select("+password");

    if(!user) {
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password",401));
    }

    sendToken(user,200,res);
});

//logout user 
exports.logout = catchAsyncError(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Logged Out Successfully"
    });
});

//forgot password
exports.forgotPassword = catchAsyncError(async(req,res,next) => {
    const user = await User.findOne({email:req.body.email});
    if(!user) {
        return next(new ErrorHandler("User Not Found",404));
    }
    //get password reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave : false});

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your Password Reset Link is :- \n\n ${resetPasswordUrl} \n\nIf You have not requested this, please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });
        res.status(200).json({
            success:true,
            message : `Email sent to ${user.email} successfully.`
        })
    }
    catch(error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave : false});
        return next(new ErrorHandler(error.message,500));
    }
});

//reset password
exports.resetPassword = catchAsyncError(async(req,res,next)=>{
    const resetPasswordToken=crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    });
    if(!user) {
        return next(
            new ErrorHandler(
                "Reset Password Token is Invalid or has been expired",400
            )
        );
    }
    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match",400));
    }
    user.password = req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    sendToken(user,200,res);
});

//get user details
exports.getUserDetails = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user,
    });
});

//update user password
exports.updatePassword = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");
    
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("old password is incorrecr",400));
    }

    if(req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match",400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user,200,res);
});

//update user profile
exports.updateProfile = catchAsyncError(async (req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    };
    //cloudinary
    if(req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
    })
});

//get all users(admin)
exports.getAllUser = catchAsyncError(async (req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success:true,
        users,
    });
});

//get single users(admin)
exports.getSingleUser = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user) {
        return next(
            new ErrorHandler(`user does not exist with id : ${req.params.id}`)
        )
    }
    res.status(200).json({
        success:true,
        user,
    });
});

//update user role
exports.updateUserRole = catchAsyncError(async (req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    };
    await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
    })
});

//delete user
exports.deleteUser = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user) {
        return next(
            new ErrorHandler(`User does not exist with id : ${req.params.id}`,400)
        );
    }
    const imageId=user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    
    await user.deleteOne  ();
    res.status(200).json({
        success:true,
    })
});

