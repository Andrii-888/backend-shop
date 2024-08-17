const { request } = require("express");

const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.get("/config", (req, res) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});
router.post("/create-customer", async (req, res) => {
  try {
    const { email, name } = req.body;
    const customer = await stripe.customers.create({ email, name });
    return req.json({ customerId: customer.id });
  } catch (error) {
    return res.status(400).json({ error: { massege: error.massege } });
  }
});
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { totalPrice } = req.body;
    // const { totalPrice,customerId,description } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "CHF",
      amount: totalPrice,
      //customer:customerId
      //description:description
      automatic_payment_methods: { enabled: true },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

module.exports = router;
