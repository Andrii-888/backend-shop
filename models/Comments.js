const mongoose = require("mongoose");
const commentsSchema = new mongoose.Schema({
  title: {
    type: String,
    requared: true,
  },
  comment: {
    type: String,
    requared: true,
  },
  autor: {
    type: Array,
    requared: true,
  },
  product: {
    type: Array,
    requared: true,
  },
});

module.exports = mongoose.model("Comment", commentsSchema);
