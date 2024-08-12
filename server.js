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

//   if (!req.session.cart) {
//     req.session.cart = [];

//   }
//   next();
// });

// app.use(routes);

// app.listen(PORT, function () {
// });

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const MongoStore = require("connect-mongo");
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
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL, // URL для подключения к MongoDB
      collectionName: "sessions", // Название коллекции, где будут храниться сессии
    }),
    cookie: { maxAge: 60000 * 60 * 24 * 30, secure: false }, // 30 дней
  })
);

// Middleware для инициализации корзины в сессии
app.use((req, res, next) => {
  console.log(req.session, 666);
  if (!req.session.cart) {
    req.session.cart = [];
  }
  console.log(req.session.favorite, 555);
  if (!req.session.favorite) {
    req.session.favorite = [];
  }
  next();
});

app.use((req, res, next) => {
  next();
});

app.use(routes);

app.listen(PORT, function () {});
