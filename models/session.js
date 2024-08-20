const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  cart: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      amount: { type: Number, required: true },
    },
  ],
  favorite: [
    {
      productId: { type: String, required: true },
    },
  ],
  userId: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Session", sessionSchema);
