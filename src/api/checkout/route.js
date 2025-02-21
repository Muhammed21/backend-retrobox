import Stripe from "stripe";
import { getEmailContent } from "../../lib/template/emailTemplate";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-01-27.acacia",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, amount, customerEmail, customerName } = req.body;
    let event;

    try {
      // Optionnel: Création d'un client Stripe
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
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        customer: customer.id,
        mode: "payment",
        allow_promotion_codes: true,
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}`,
      });

      if (session.status === "complete") {
        const session = event.data.object;

        const customerName = session.customer_details.name;
        const customerEmail = session.customer_details.email;

        const { subject, text, html } = getEmailContent({ customerName });

        try {
          const response = await fetch(
            "https://frontend-retrobox.vercel.app/api/v1/test-mail",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: customerEmail,
                subject,
                text,
                html,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Erreur lors de l'envoi de l'e-mail");
          }

          console.log("E-mail envoyé avec succès");
        } catch (err) {
          console.error("Erreur lors de l'envoi de l'e-mail:", err);
        }
      }

      res.status(200).json({ id: session.id });
    } catch (err) {
      console.error("Stripe error:", err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
