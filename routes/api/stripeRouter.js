const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.get("/config", (req, res) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});
router.post("/create-payment-intent", async (reg, res) => {
  try {
    
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 2000,
      automatic_payment_methods: { enabled: true },
    });
   
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

module.exports = router;
