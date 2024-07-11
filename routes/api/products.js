const router = require("express").Router();
const db = require("../../models");
const deepl = require("deepl-node");

const authKey = process.env.AUTH_KEY;
const translator = new deepl.Translator(authKey);

(async () => {
  const result = await translator.translateText("Hello, world!", null, "fr");
  console.log(result.text);
})();

router.get("/", async (request, response) => {
  try {
    const products = await db.Product.find();

    response.json(products);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (request, response) => {
  try {
    const product = await db.Product.findById(request.params.id);
    if (!product) {
      response.status(404).json({ message: "product not found" });
      return;
    }
    response.json(product);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

module.exports = router;
