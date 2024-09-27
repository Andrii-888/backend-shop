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
// const seedData = require("./models/sead");

require("dotenv").config();

const PORT = process.env.PORT || 5001;
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: "https://lovely-selkie-5e8f04.netlify.app/ru",
    credentials: true,
  })
);
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan("tiny"));
app.use(routes);

// seedData();

// Функция для генерации уникального идентификатора сессии
// function generateSessionId() {
//   return crypto.randomBytes(16).toString("hex");
// }

// Роут для создания и получения сессии
// app.post("/api/session", async (req, res) => {
//   console.log(15);
//   try {
//     // Извлечение идентификатора сессии из куки
//     const sessionId = req.cookies["sessionId"];
//     console.log(sessionId, 999);
//     if (!sessionId) {
//       // Если идентификатор сессии не найден, создаем новый
//       const newSessionId = generateSessionId();
//       const newSession = db.Session({
//         sessionId: newSessionId,
//         userId: generateUserId(), // Вы можете заменить на реальный идентификатор
//         cart: [],
//         favorite: [],
//       });
//       // console.log(newSession, 23456);
//       await newSession.save();
//       console.log(newSessionId, 909);
//       // Устанавливаем куку с идентификатором новой сессии
//       res.cookie("sessionId", newSessionId, {
//         maxAge: 60000 * 60 * 24 * 30, // 30 дней
//         httpOnly: true,
//         // sameSite: "Lax", // Защита от CSRF атак
//         sameSite: "None", // Измените на "None"
//         secure: false, // Убедитесь, что secure: false на localhost
//       });
//       console.log("Headers Sent:", res.headersSent);
//       console.log("Request Cookies:", req.cookies["sessionId"]); // Посмотрите, какие куки приходят
//       console.log("Request Origin:", req.headers.origin); // Убедитесь, что Origin совпадает с ожидаемым
//       // Ваш код дальше...

//       res.json({
//         sessionId: newSessionId,
//         userId: newSession.userId,
//         cart: newSession.cart,
//         favorite: newSession.favorite,
//       });
//     } else {
//       // Если идентификатор сессии существует, извлекаем сессию из базы данных
//       const session = await db.Session.findOne({ sessionId });

//       if (!session) {
//         return res.status(404).json({ error: "Session not found" });
//       }

//       res.json({
//         sessionId: session.sessionId,
//         userId: session.userId,
//         cart: session.cart,
//         favorite: session.favorite,
//       });
//     }
//   } catch (error) {
//     console.error("Error handling session:", error);
//     res.status(500).json({ error: "Failed to handle session" });
//   }
// });

// function generateUserId() {
//   return Math.random().toString(36).substring(2, 15);
// }

// app.listen(PORT, function () {
//   console.log(`app listen on port ${PORT}`);
// });

// Засев данных в базу перед началом работы сервера
// seedData().then(() => {
app.listen(PORT, function () {
  console.log(`app listen on port ${PORT}`);
});
// });
