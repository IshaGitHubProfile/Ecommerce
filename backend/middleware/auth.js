const ErrorHandler = require("../utils/errorhandler");   //to handle errors that occurs within our application
const catchAsyncError = require("./catchAsyncError");   //to ensure that app does not crash and pass the error to next() middleware function
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncError(async (req,res,next) => {
    const {token} = req.cookies; //this line extracts token property from cookies object in request
    if(!token) {
        return next(new ErrorHandler("Please Login to access this page",401));
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);  //this line verify the jwt token 

    req.user = await User.findById(decodedData.id);  //retrive user data from database using decoded user ID  extracted from token 
    //await here is used do pause the execution of asynchronous function until the promise is resolved meaning user data is successfullt fetched from database 
    //if await is not used the code would not pause and wait for the User.findById() Promise to resolve. 
    //Instead, it would continue executing immediately after the User.findById() call,
    //potentially before the user data is fetched from the database. This would lead to req.user being assigned undefined or incorrect data.

    next(); //pass control to next middleware in stack
});

exports.authorizeRoles = (...roles) => {  //...roles, gathers the arguments passed to the function into an array named roles.
    return (req,res,next) => {  
        if(!roles.includes(req.user.role)) {  
            //This conditional statement checks if the role of the authenticated user (req.user.role) 
            //is not included in the list of roles passed as arguments to the authorizeRoles middleware. 
            return next (new ErrorHandler(`${req.user.role} is not allowded to access this resource`,403));
        }
        next();
    };
};