const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
  {
    label: { type: String },
    value: { type: Number },
    Image: { type: String },
    Parent: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: { type: Array },
  },
  { strict: false, timestamps: true }
);
module.exports =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
