const router = require("express").Router();
// const sessionRouter = require("./session.js");
const productRouter = require("./products.js");
const stripeRouter = require("./stripeRouter.js");
const cartRouter = require("./cart.js");
const favoriteRouter = require("./favorite.js");
// router.use("/session", sessionRouter);
router.use("/products", productRouter);
router.use("/stripe", stripeRouter);
router.use("/carts", cartRouter);
router.use("/favorite", favoriteRouter);

module.exports = router;
