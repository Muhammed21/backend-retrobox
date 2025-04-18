const { getEmailContent } = require("../../lib/template/emailTemplate");

let stripePromise;

const FRONTEND = process.env.BETTER_AUTH_URL;

function getStripeInstance() {
  if (!stripePromise) {
    stripePromise = import("stripe").then((module) => {
      return new module.default(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-01-27.acacia",
      });
    });
  }
  return stripePromise;
}

module.exports = async function handler(req, res) {
  const stripe = await getStripeInstance();

  if (req.method === "POST") {
    const { name, amount, customerEmail, customerName } = req.body;

    try {
      const customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card", "klarna", "link", "paypal"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: name,
              },
              unit_amount: parseInt(amount * 100),
            },
            quantity: 1,
          },
        ],
        customer: customer.id,
        mode: "payment",
        allow_promotion_codes: true,
        success_url: `${FRONTEND}/success`,
        cancel_url: `${FRONTEND}`,
      });

      res.status(200).json({ id: session.id });
    } catch (err) {
      console.error("Stripe error:", err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
