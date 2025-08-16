var nodemailer = require('nodemailer');

var sendMailContent = async (sendermail, subject, mailContent) => {
    const trasport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: "webdev.prasad@gmail.com",
            pass: "nmup wlbu yxrn jdxm",
        },
        });

        var mailcontent  = '<!DOCTYPE><html><head></head><body><b>hello from mailsss</b></body></html>';
    
        await trasport.sendMail({
            from: "Support@OneStopShopping.com",// process.env.Gmail,
            to: 'webdev.prasad@gmail.com',
            subject: 'Message from OneStopShopping Support Team',
            text: 'You did a login just now - hope it is you, if not, report us'
        });
};

module.exports = sendMailContent;

