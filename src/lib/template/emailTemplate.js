export const getEmailContent = ({ customerName }) => {
  const subject = `Order #4 Fulfilled`;
  const text = `Dear ${customerName},
  
  Your order #4 has been marked as fulfilled. 
  Thank you for shopping with us!
  
  Best regards,
  Cheap Store`;

  const html = `
      <p>Dear ${customerName},</p>
      <p>Your order <strong>#4</strong> has been marked as fulfilled.</p>
      <p>Thank you for shopping with us!</p>
      <p>Best regards,<br>Cheap Store</p>
    `;

  return { subject, text, html };
};
