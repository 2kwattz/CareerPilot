const nodemailer = require('nodemailer');

const sendMail = async function (req,res){

    const testAccount = await nodemailer.createTestAccount();

    // Connection with SMTP Server

    let transporter = await nodemailer.createTransport({

        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: 'roslyn.mertz@ethereal.email',
            pass: 'eHY3rpZp1Jx6tKzYm7',
        },
    });

    let info = await transporter.sendMail({
        from: `"Vinod Thapa" "< 2kwattz@gmail.com >"`,
        to: "prakashbhatia1970@gmail.com",
        text: "Hello, This is a test message",
        html: "<b> Hello </b>"

    })
    res.send(info);
}

module.exports = sendMail;