const ErrorHandler = require("../utils/errorhandler");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    if(err.name === "CastError") { //occurs when a provided value can not be casted to expected type 
        const message = `Resource not found. Invalid : ${err.path}`;
        err=new ErrorHandler(message,400);
    }

    if(err.code === 11000) {   //to handle that duplicate index error should not occur in mongodb
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err=new ErrorHandler(message,400);
    }

    if(err.name === "JsonWebTokenError") {
        const message = `Json web token is invalid`;
        err=new ErrorHandler(message,400);
    }

    if(err.name === "TokenExpiredError") {
        const message = `Json web token is expired , try again`;
        err=new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({  //send http status code of respose to the statusCode property of the error object
        success:false,
        message:err.message,
    });
};