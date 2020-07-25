const config = require('../../../../config');

class EmailService
{
  constructor(nodemailer)
  {
    this._transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: config.GMAIL,
    });
  }

  async emailConfirmation()
  {
    await this._transporter.sendMail({
      from: '"Trist" <donotreply@trist.com>', // sender address
      to: "casey.tai@icloud.com", // list of receivers
      subject: "Welcome", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  }
}

module.exports = EmailService;
