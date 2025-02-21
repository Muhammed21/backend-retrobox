const { handler } = require("../api/email/postEmail");

const testEmailRoute = async (req, res) => {
  const { email, subject, text, html } = req.body;

  if (!email || !subject || !text || !html) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  console.log("Sending email to:", email);

  try {
    const result = await handler({ email, subject, text, html });

    if (result.success) {
      return res.status(200).json({ message: "Email sent successfully!" });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
};

module.exports = {
  testEmailRoute,
};
