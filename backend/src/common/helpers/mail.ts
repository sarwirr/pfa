import * as nodemailer from 'nodemailer';

export function sendEmail(recipient: string, message: string) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mail_configs = {
      from: process.env.SENDER_EMAIL,
      to: recipient,
      subject: 'Order Confirmation',
      text: 'Order Confirmation',
      html:
        'Hi! <br><br> If you requested to reset your password<br><br>' +
        '<a href=' +
        process.env.URL +
        ':' +
        process.env.APP_PORT +
        '/user/resetpassword/' +
        message +
        '>Click here</a>',
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `Error happend while sending...` });
      }
      return resolve({ message: 'Email sent succesfuly' });
    });
  });
}
