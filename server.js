// const session = require("express-session");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");

// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
// const routes = require("./routes");
// require("dotenv").config();
// const PORT = process.env.PORT || 5001;
// const app = express();

// app.use(bodyParser.json());
// app.use(cookieParser());

// app.use(express.json());
// app.use(cors());
// app.use(morgan("tiny"));

// // Настройка сессий
// app.use(
//   session({
//     secret: process.env.SECRET_KEY,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 * 60 * 24 * 30 }, // 30 дней
//   })
// );

// // Middleware для инициализации корзины в сессии
// app.use((req, res, next) => {
//   console.log(req.session, 2222);

//   if (!req.session.cart) {
//     req.session.cart = [];
//     console.log(req.session.cart);
//   }
//   next();
// });

// app.use(routes);

// app.listen(PORT, function () {
//   console.log("express is listening to port", PORT);
// });

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || 5001;
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
// app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("tiny"));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60 * 24 * 30, secure: false }, // 30 дней
  })
);

// Middleware для инициализации корзины в сессии
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});

app.use((req, res, next) => {
  console.log(`Session ID: ${req.sessionID}`); // Вывод идентификатора сессии
  next();
});

// Пример маршрута для добавления товара в корзину
// app.post("/add-to-cart", (req, res) => {
//   const { productId, quantity, amount } = req.body;
//   const existingProductIndex = req.session.cart.findIndex(
//     (item) => item.productId === productId
//   );

//   if (existingProductIndex >= 0) {
//     // Если товар уже есть в корзине, обновляем количество
//     req.session.cart[existingProductIndex].quantity += quantity;
//   } else {
//     // Иначе добавляем новый товар в корзину
//     req.session.cart.push({ productId, quantity, amount });
//   }

//   console.log(req.session.cart); // Отладочный вывод состояния корзины
//   res.status(200).json({ cart: req.session.cart });
// });

app.use(routes);

app.listen(PORT, function () {
  console.log("express is listening to port", PORT);
});
