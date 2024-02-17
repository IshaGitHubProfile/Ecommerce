class ErrorHandler extends Error{ //this line defines a class ErrorHandler that extends all the properties of the built-in class Error
     constructor(message,statusCode) { //this is the constructor message of the error handler class
        super(message); //calls constructor of parnet class('Error') with the provided message parameter
        this.statusCode=statusCode  //this assigns statusCode parameter to statusCode property of error handler instance

        Error.captureStackTrace(this,this.constructor); //captures stack trace at the point where ErrorHandler instance is created, this can be helpful for debugging, as it provides info about call stack leading up to error
     }
}

module.exports = ErrorHandler