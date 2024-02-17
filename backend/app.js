const express = require("express"); //import express js framework
const app = express(); //create instance of express application
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser"); //import cookie parser middleware for parsing cookies from incoming req
const bodyParser = require("body-parser"); //for parsing incoming request bodies
const fileUpload = require("express-fileupload");//for handling file uploads
const dotenv = require("dotenv"); //for oading env variables from .env file

dotenv.config({ path: "backend/config/config.env" }); //load environment variables from .env file
app.use(express.json()); //middleware to parse json bodies of incoming request
app.use(cookieParser()); //Middleware to parse cookies from incoming requests.
app.use(bodyParser.urlencoded({ extended:true })); //Middleware to parse URL-encoded request bodies. The extended: true option allows parsing of nested objects.
app.use(fileUpload()); // Middleware to handle file uploads. 

const product = require("./routes/productRoute"); //Imports routes for product-related endpoints.
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1",product);  //Mounts the product routes under the /api/v1 base path.
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

app.use(errorMiddleware); //Mounts the error handling middleware.

module.exports = app;