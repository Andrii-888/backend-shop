const router = require("express").Router();

// Маршрут для добавления товара в корзину
router.post("/add-to-cart", (req, res) => {
  const { productId, quantity, amount } = req.body;
  console.log(productId, 111);
  console.log(req.session.cart);
  console.log(req.sessionID, 555);

  // Найти товар в корзине
  const existingProduct = req.session.cart.find(
    (item) => item.productId === productId
  );
  console.log(existingProduct);
  if (existingProduct) {
    // Обновить количество, если товар уже есть в корзине
    existingProduct.quantity += quantity;
    existingProduct.amount += amount;
  } else {
    // Добавить новый товар в корзину
    req.session.cart.push({ productId, quantity, amount });
  }

  res.json({ carts: req.session.cart });
});

// Маршрут для получения корзины
router.get("/cart", (req, res) => {
  res.json(req.session.cart);
});

// Маршрут для удаления товара из корзины
router.put("/remove-from-cart", (req, res) => {
  const { productId } = req.body;
  req.session.cart = req.session.cart.filter(
    (item) => item.productId !== productId
  );
  res.send("Товар удален из корзины");
});

// Маршрут для очистки корзины
router.delete("/clear-cart", (req, res) => {
  req.session.cart = [];
  res.send("Корзина очищена");
});

module.exports = router;
