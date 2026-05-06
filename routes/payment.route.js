import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// ❗ Vérification AVANT utilisation
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key missing");
}

if (!process.env.CLIENT_URL) {
  console.warn("CLIENT_URL not set, using default");
  process.env.CLIENT_URL = "http://localhost:4200";
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const { items } = req.body;

    // ✅ validation propre
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items invalid" });
    }

    // ✅ création session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',

      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name || "Produit"
          },
          unit_amount: Math.round(Number(item.price || 0) /3 )
        },
        quantity: Number(item.quantity || 1)
      })),

      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`
    });

    return res.json({ id: session.id });

  } catch (error) {
    console.error("STRIPE ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;