const router = require("express").Router();

// Маршрут для добавления товара в favorite
// router.put("/add-to-favorite", (req, res) => {
//   const { id } = req.body;
//   console.log(id);
//   // Найти товар в корзине
//   const existingProduct = req.session.favorite.find((item) => item.id === id);

//   if (existingProduct) {
//     // Обновить количество, если товар уже есть в favorite
//     req.session.favorite = req.session.favorite.filter(
//       (item) => item.productId !== productId
//     );
//   } else {
//     // Добавить новый товар в favorite
//     req.session.favorite.push({ id });
//   }
//   console.log(req.session.favorite);
//   res.json({ favorites: req.session.favorite });
// });

// Маршрут для получения favorite
// router.get("/", (req, res) => {
//   res.json(req.session.favorite);
// });

module.exports = router;
