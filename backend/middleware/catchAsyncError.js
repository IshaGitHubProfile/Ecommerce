//Wrapping theFunc with a Promise resolves it and catches any errors that occur during its execution. 
//This ensures that if theFunc rejects or throws an error, it doesn't crash the application but instead passes 
//the error to the next() middleware function.
// the next() function is used to pass control to the next middleware function in the middleware stack.

module.exports = (theFunc) => (req,res,next) => {
    Promise.resolve(theFunc(req,res,next)).catch(next);
};

//this code creates a wrapper func that takes theFunc as an
//argument the returned function then takes req,res,next as argument
//promise.resolve() is used to ensure that theFunc return a promise
//if theFUnc returns a promise then it will resolve it immediately
//if it returns a non-promise value then promise.resolve will wrap it into a promise
//.catch(next): This line adds a .catch() block to handle any errors that might occur during the execution of theFunc