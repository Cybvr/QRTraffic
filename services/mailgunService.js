  // File: services/mailgunService.js

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || '95dfe9bc8782e8eb241f35677c42052d-777a617d-9101d5e4'});

  const sendEmailNotification = (to, subject, text, html) => {
    return mg.messages.create('your-mailgun-domain', {
      from: "QR Traffic Notifications <mailgun@hello.qrtraffic.com>",
      to: [to],
      subject: subject,
      text: text,
      html: html
    })
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
  };

  module.exports = { sendEmailNotification };