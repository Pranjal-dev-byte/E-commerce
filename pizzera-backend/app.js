var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let mongoose = require("mongoose");
let cors = require("cors");
const jwt = require("jsonwebtoken");

const Ingredients = require("./model/IngredientSchema");
const Pizza = require("./model/PizzaSchema");
const Users = require("./model/UserSchema");

var app = express();
const port = 3000;

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(
  "mongodb+srv://Mongo_test:pranjal12@cluster0.iraym.mongodb.net/Pizzeria?retryWrites=true&w=majority",
  {
    useNewUrlParser: "true",
  }
);
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/pizza", (req, res) => {
  Pizza.find().then((result) => res.json(result));
});

app.get("/ingredients", (req, res) => {
  Ingredients.find().then((result) => res.json(result));
});

app.get("/cart", async (req, res) => {
  console.log(req.query.email);
  // if (req.query.email) {
  const email = req.query.email;
  await Users.find({ email }).then((result) => res.json(result));
  // } else {
  // }
});

// app.delete("/cart", async (req, res) => {
//   const id = req.query.id;
//   Favorite.updateOne( {id: id}, { $pullAll: {id: [req.params.id] } } )

//   await Users.deleteOne({ id: id }).then((result) => res.json(result)); // returns {deletedCount: 1}
// });
// /
app.post("/register", async (req, res) => {
  try {
    // Get user input
    const { username, email, password } = req.body;
    console.log(req.body);
    // Validate user input
    if (!(email && password && username)) {
      console.log("IN 400 block");
      return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Users.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    // encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await Users.create({
      username,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password,
    });

    // Create token
    const token = jwt.sign({ user_id: user._id, email }, "$ucideboy$");
    // save user token
    user.token = token;

    // return new user
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});
// console.log(req.body);

app.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await Users.findOne({ email });

    if (user && user.password === password) {
      console.log("Allowed");
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, "$ucideboy$");

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

app.put("/cart", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    // console.log(req.body);
    const { cart, email } = req.body;
    // for (let order of cart) {
    //   console.log(order);
    //   // for(let )
    // }
    if (!email) {
      return res.status(400).send("Not able to fetch the email!");
    }
    if (!cart) {
      return res.status(400).send("The cart is empty!");
    }
    // const doc = await User.findOne({email});
    try {
      await Users.updateOne({ email }, { cart });
    } catch (err) {
      console.log(err);
    }
    return res.status(200).json(cart);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// app.use("/ingredients", ingredientsRouter);
// app.use("/pizza", pizzaRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
