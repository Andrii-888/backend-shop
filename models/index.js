require("dotenv").config();
const mongoose = require("mongoose");
const URL = process.env.DATABASE_URL;
mongoose.connect(URL);
const db = mongoose.connection;
db.on("connected", function () {
  console.log(`connected to mongodb at ${db.host}`);
});
module.exports = {
  Client: require("./Clients.js"),
  Product: require("./Products.js"),
};
