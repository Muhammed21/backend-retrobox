const nodemailer = require("nodemailer");

async function handler({ email, subject, text, html }) {
  if (!email || !subject || !text || !html) {
    throw new Error("Missing required fields");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text,
      html,
    };

    // Envoi de l'e-mail
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    throw new Error("Failed to send email: " + error.message);
  }
}

module.exports = { handler };
