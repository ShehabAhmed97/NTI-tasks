const nodemailer = require("nodemailer")
const smtpCongfig = {
    service: "gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
}
const sendMail = (reciverEmail, EmailContent)=>{
    try{
        const transporter = nodemailer.createTransport(smtpCongfig)
        const mailOptions= {
            from:"ecommerce app",
            to: reciverEmail,
            subject:"Account activation Email",
            html:EmailContent
        }
        transporter.sendMail(mailOptions)
    }
    catch(e){
        console.log(e.message)
    }
}
module.exports = sendMail
