const config = require('../../../src/config');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

class EmailService
{
  constructor()
  {
    this._transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: config.GMAIL,
    });
    this._transporter.use('compile', hbs({
      viewEngine: {
        extname: '.hbs',
        layoutsDir: path.join(__dirname, 'templates'),
        defaultLayout:  'confirmEmail',
      },
      viewPath: path.join(__dirname, 'templates'),
      extName: '.hbs'
    }));
  }

  async emailConfirmation(to, url, username)
  {
    this._transporter.sendMail({
      from: '"Trist" <donotreply@trist.com>', // sender address
      to, // receiver
      subject: "Welcome", // Subject line
      text: "Hello world?", // plain text body
      template: 'confirmEmail', // html body
      context: {
        username,
        url,
      },
    });
  }
}

module.exports = EmailService;
