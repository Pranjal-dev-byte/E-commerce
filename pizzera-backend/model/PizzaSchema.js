const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PizzaSchema = new Schema(
  {
    id: {
      type: String,
    },
    type: {
      type: String,
    },
    price: {
      type: Number,
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    ingredients: {
      type: [String],
    },
    toppings: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Pizza = mongoose.model("pizzas", PizzaSchema);

module.exports = Pizza;
