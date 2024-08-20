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
const crypto = require("crypto"); // Для генерации уникальных идентификаторов

// const MongoStore = require("connect-mongo");
const db = require("./models");

require("dotenv").config();

const PORT = process.env.PORT || 5001;
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
// app.use(cors());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan("tiny"));

// app.use((req, res, next) => {
//   console.log("Session ID before session middleware:", req.sessionID);
//   next();
// });

// Функция для генерации уникального идентификатора сессии
function generateSessionId() {
  return crypto.randomBytes(16).toString("hex");
}

// Роут для создания и получения сессии
app.post("/api/session", async (req, res) => {
  console.log(15);
  try {
    // Извлечение идентификатора сессии из куки
    const sessionId = req.cookies["sessionId"];
    console.log(sessionId, 999);
    if (!sessionId) {
      // Если идентификатор сессии не найден, создаем новый
      const newSessionId = generateSessionId();
      const newSession = db.Session({
        sessionId: newSessionId,
        userId: generateUserId(), // Вы можете заменить на реальный идентификатор
        cart: [],
        favorite: [],
      });

      await newSession.save();

      // Устанавливаем куку с идентификатором новой сессии
      res.cookie("sessionId", newSessionId, {
        maxAge: 60000 * 60 * 24 * 30, // 30 дней
        // httpOnly: true,
        sameSite: "Lax", // Защита от CSRF атак
      });

      res.json({
        sessionId: newSessionId,
        userId: newSession.userId,
        cart: newSession.cart,
        favorite: newSession.favorite,
      });
    } else {
      // Если идентификатор сессии существует, извлекаем сессию из базы данных
      const session = await db.Session.findOne({ sessionId });

      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      res.json({
        sessionId: session.sessionId,
        userId: session.userId,
        cart: session.cart,
        favorite: session.favorite,
      });
    }
  } catch (error) {
    console.error("Error handling session:", error);
    res.status(500).json({ error: "Failed to handle session" });
  }
});

function generateUserId() {
  return Math.random().toString(36).substring(2, 15);
}

// app.post("/api/session", (req, res) => {
// app.use(
//   session({
//     secret: process.env.SECRET_KEY,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: process.env.DATABASE_URL, // URL для подключения к MongoDB
//       collectionName: "sessions", // Название коллекции, где будут храниться сессии
//     }),
//     cookie: { maxAge: 60000 * 60 * 24 * 30, secure: false }, // 30 дней
//   })
// );
// if (!req.session.userId) {
//   // Если сессия не существует, создаем новую
//   req.session.userId = generateUserId(); // Функция для генерации уникального идентификатора пользователя
//   req.session.cart = []; // Пример: создаем пустую корзину для нового пользователя
// }

// res.json({
//   sessionId: req.sessionID, // Отправляем ID сессии в ответе
//   userId: req.session.userId, // Отправляем идентификатор пользователя
//   cart: req.session.cart, // Отправляем корзину
// });
// }),
// Middleware для инициализации корзины в сессии
// app.use((req, res, next) => {
//   if (!req.session.cart) {
//     req.session.cart = [];
//   }

//   if (!req.session.favorite) {
//     req.session.favorite = [];
//   }
//   next();
// });

// app.use((req, res, next) => {
//   console.log("Session ID after session middleware:", req.sessionID);
//   next();
// });

app.use(routes);

app.listen(PORT, function () {});
