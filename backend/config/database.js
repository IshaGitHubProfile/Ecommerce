//connection of node js module with database
const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI,{
        //useNewUrlParse:true
    }).then(
        //mongoose.connect method returns a promise .then method is chained to mongoose.connect
        //to handle resolved promises(i.e. when the connection is successfully established)
        //inside this then function a callback function is provided. this callback function consoles that connection is successful
        (data) => {
            console.log(`MongoDB connected with server : ${data.connection.host}`);
        }
    )
    // .catch((err)=>{
    //     console.log(err);
    // })
}

module.exports = connectDatabase;