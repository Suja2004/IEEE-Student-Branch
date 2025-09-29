const nodemailer = require("nodemailer");

const sendEmail = async (recipientEmails, subject, text) => {
  // IMPORTANT: Use an app password for Gmail if you have 2FA enabled.
  // Or better, use a transactional email service like SendGrid, Mailgun etc. for production.
  const transporter = nodemailer.createTransport({
    service: "gmail", // or another email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  const mailOptions = {
    from: `"IEEE SMVITM" <${process.env.EMAIL_USER}>`,
    to: recipientEmails.join(", "), // Can be a single email or a comma-separated list
    subject: subject,
    text: text,
    // html: '<b>Hello world?</b>' // You can also send HTML
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;
