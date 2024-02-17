const app = require("./app"); //Imports the Express application (app.js) created in app.js
const dotenv = require("dotenv"); //Imports the dotenv library for loading environment variables.
const cloudinary = require("cloudinary"); //Imports the cloudinary library for interacting with the Cloudinary service.
const connectDatabase = require("./config/database");

//handling uncaught exception\
//It handles synchronous errors that are not caught by a try...catch block or an error handler middleware.
//An uncaught exception typically indicates a serious error that the application cannot recover from.
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down server due to uncaught exception`);
    process.exit(1);
})

dotenv.config({path:"backend/config/config.env"}); //Loads environment variables from the specified .env file using dotenv.

connectDatabase();

cloudinary.config({  
    //Configures Cloudinary with the provided API credentials obtained from environment variables. This allows the application to interact with the Cloudinary service for storing and managing media files.
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//unhandeled promise rejection
//It handles asynchronous errors that occur in Promises and are not caught by a .catch() handler.
//In the event handler, the server is gracefully shut down by closing the server's connection using server.close() before exiting the process with process.exit(1).
process.on("unhandledRejection",(err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down server due to unhandeled promise rejection`);

    server.close(() => {
        process.exit(1);
    });
});