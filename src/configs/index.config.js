const pino = require('pino')
const nodemailer = require('nodemailer')

const logger = pino()

let morganConfig = `:date[iso] :method :url :status :response-time ms :remote-addr :http-version :referrer :user-agent`

const sendMail = async (
  subject,
  content
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_ADDRESS,
    to: process.env.TO,
    subject: subject,
    sender: "The LearnWave Team",
    html: `<!doctype html>
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </head>
        <body style="font-family: sans-serif;">
          <div style="display: block; margin: auto; max-width: 600px;" class="main">
              <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Hello, ${process.env.NAME}
                !</h1>
              ${content}
              <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">The Bale Team</h1>
                </div>
                <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
                <style>
                  .main { background-color: white; }
                  a:hover { border-left-width: 1em; min-height: 2em; }
                </style>
              </body>
            </html>`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log(`Email successfully sent to ${process.env.NAME}<${process.env.TO}>`);
    }
  });
};

module.exports = { logger, sendMail, morganConfig }