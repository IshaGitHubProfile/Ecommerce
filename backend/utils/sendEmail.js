const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    //takes an options object as a parameter. The options object 
    //contains information such as the recipient's email address, the subject of the email, and the email message.
    //This code creates a transporter object using nodeMailer.createTransport() method. 
    //The transporter object is responsible for sending emails.
    //It uses the SMTP configuration provided in the environment variables (process.env) 
    //such as SMTP host, port, service, email, and password for authentication
    const transporter = nodeMailer.createTransport({
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        service : process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,
        },
    });
    //This code defines the email options using an object named mailOptions.
    const mailOptions = {
        from : process.env.SMPT_MAIL,
        to : options.email,
        subject : options.subject,
        text : options.message,
    };
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;