const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lang: { type: String, require: true },
  image: { type: [String], required: true },
  productCode: {
    type: Number,
    required: true,
  },
  description: {
    type: [String], // Массив строк
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    rate: { type: Number, required: true },
    feedBackCount: { type: Number, required: true },
  },
  material: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: { type: String, required: true },
  availabileSize: {
    type: [String],
    required: true,
  },
  sizes: {
    double: {
      size: { type: String, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      color: { type: [String], required: true }, // Массив строк
      availability: { type: Number, required: true },
    },
    // Вы можете добавить другие размеры здесь, если нужно
  },
});

module.exports = mongoose.model("Product", productsSchema);
