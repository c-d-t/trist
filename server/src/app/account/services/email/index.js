const EmailService = require('./email');
const nodemailer = require('nodemailer');

const emailService = new EmailService(nodemailer);

module.exports = emailService;
