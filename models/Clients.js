const mongoose = require("mongoose");
const clientsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    requared: true,
  },
  email: {
    type: String,
    requared: true,
  },
  phoneNumber: {
    type: String,
    requared: true,
  },
  password: {
    type: String,
    requared: true,
  },
});

module.exports = mongoose.model("Client", clientsSchema);
