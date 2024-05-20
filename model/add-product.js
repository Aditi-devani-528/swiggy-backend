const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productImg: String,
  offers: String,
  restaurantName: String,
  rating: String,
  minutes: String,
  subtitle: String,
  area: String,
});

module.exports = mongoose.model("Product", productSchema);
