const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let IngredientsSchema = new Schema(
  {
    id: {
      type: String,
    },
    tName: {
      type: String,
    },
    price: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Ingredients = mongoose.model("Ingredients", IngredientsSchema);

module.exports = Ingredients;
