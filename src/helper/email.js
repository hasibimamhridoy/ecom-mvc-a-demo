
const nodemailer = require("nodemailer");
const { SMTP_USERNAME, SMTP_PASS } = require("../../secret");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: SMTP_USERNAME,
        pass: SMTP_PASS
    }
});


const sendEmailWithNodeMailer = async (emailData) => {

    try {
        const emailOptions = {

            from: SMTP_USERNAME, // sender address
            to: emailData.email, // list of receivers
            subject: emailData.subject, // Subject line
            html: emailData.html, // html body
        }

        const result = await transporter.sendMail(emailOptions)
        console.log("message from sendEmailResult: ", result.response);
    } catch (error) {
        throw new Error(error.message)
    }

}

module.exports = sendEmailWithNodeMailer
