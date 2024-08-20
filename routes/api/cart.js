const db = require("../../models");

const router = require("express").Router();

// router.get("/cart", async (req, res) => {
//   const sessionId = req.sessionID;
//   console.log(sessionId);
//   const cart = req.session.cart;
//   res.json({ cart, sessionId });
// });

// Маршрут для добавления товара в корзину
// router.post("/add-to-cart", async (req, res) => {
//   const { productId, quantity, amount, sessionId } = req.body;
//   console.log(typeof sessionId, 44444);
//   try {
//     // Найти сессию по sessionId
//     let session = await db.Session.findOne({ _id: sessionId });
//     console.log(session);
//     if (!session) {
//       return res.status(404).json({ error: "Сессия не найдена" });
//     }

//     // Проверить, существует ли уже товар в корзине
//     const existingProductIndex = session.cart.findIndex(
//       (item) => item.productId.toString() === productId
//     );

//     if (existingProductIndex !== -1) {
//       // Обновить количество и сумму, если товар уже есть в корзине
//       session.cart[existingProductIndex].quantity += quantity;
//       session.cart[existingProductIndex].amount += amount;
//     } else {
//       // Добавить новый товар в корзину
//       session.cart.push({ productId, quantity, amount });
//     }

//     // Сохранить изменения в базе данных
//     await session.save();

//     // Отправить обновленную корзину в ответе
//     res.json({ cart: session.cart });
//   } catch (error) {
//     console.error("Ошибка при добавлении в корзину:", error);
//     res.status(500).json({ error: "Не удалось добавить в корзину" });
//   }
// });

// Маршрут для удаления товара из корзины
// router.put("/remove-from-cart", async (req, res) => {
//   const { productId } = req.body;
//   req.session.cart = req.session.cart.filter(
//     (item) => item.productId !== productId
//   );
//   res.send("Товар удален из корзины");
// });

// Маршрут для очистки корзины
// router.delete("/clear-cart", async (req, res) => {
//   req.session.cart = [];
//   res.send("Корзина очищена");
// });

module.exports = router;
