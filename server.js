const express = require("express");
const morgan = require("morgan");
const routes = require("./routes");
require("dotenv").config();
const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(routes);
app.listen(PORT, function () {
  console.log("express is listening to port", PORT);
});
