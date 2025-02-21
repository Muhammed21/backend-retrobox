export const getEmailContent = ({ customerName }) => {
  const subject = `Order #4 Fulfilled`;
  const text = `Dear ${customerName},
  
  Your order has been marked as fulfilled. 
  Thank you for shopping with us!
  
  Best regards,
  RetroBox`;

  const html = `
      <p>Dear ${customerName},</p>
      <p>Your order has been marked as fulfilled.</p>
      <p>Thank you for shopping with us!</p>
      <p>Best regards,<br>RetroBox</p>
    `;

  return { subject, text, html };
};
