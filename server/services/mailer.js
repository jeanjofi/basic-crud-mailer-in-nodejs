const nodemailer = require("nodemailer");
const mailController = {};

var smtpTransport = nodemailer.createTransport({
    host: 'smtp.live.com',
    port: 587,

    auth: {
        user: 'someone@hotmail.com',
        pass: 'password'
    },
    tls: {
        ciphers: 'SSLv3'
    },
    requireTLS: true
});

mailController.sendmail = function (toAddress, subject, content) {
    var success = true;
    var mailOptions = {
        from: 'jeanjofi@hotmail.com',
        to: toAddress,
        replyTo: 'jeanjofi@hotmail.com',
        subject: subject,
        html: content
    };
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log('[ERROR] Message NOT sent: ', error);
            success = false;
        }
        return (error, success);
    });
}

module.exports = mailController
