const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    Title: { type: String, required: false },
    Price: { type: Number, required: false },
    Images: { type: Array, required: false },
    Description: { type: String, required: false },
    Reviews: { type: Array, required: false },
    Categories: { type: Array, required: false },
    Colors: { type: Array, required: false },
    Date: { type: String, required: false },
  },
  { strict: false, timestamps: true }
);
module.exports =
  mongoose.models.products || mongoose.model("products", ProductSchema);
