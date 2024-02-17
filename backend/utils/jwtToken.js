//create token and save it in cookie
//responsible for sending a JWT token to the client as a cookie in the HTTP response.
const sendToken = (user,statusCode,res) => {
    const token = user.getJWTToken(); //This line calls the getJWTToken() method on the user object to generate a JWT token

    const options = {
        expires: new Date(  //Sets the expiration date of the cookie
            Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000 //5days
        ),
        httpOnly:true,  //Ensures that the cookie is only accessible via HTTP/S and cannot be accessed by JavaScript. This adds an extra layer of security by mitigating certain types of XSS (Cross-Site Scripting) attacks.
    };
    //Sets the HTTP status code of the response to the provided statusCode.
    //Sets a cookie named "token" in the response with the generated JWT token and the specified options (expiration and HTTP-only).
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token,
    });
};
module.exports = sendToken;