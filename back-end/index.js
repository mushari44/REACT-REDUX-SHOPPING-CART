const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://musharizh56:admin@cluster0.clvs4os.mongodb.net/ShoppingCart"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

const schema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String },
  price: { type: Number },
  image: { type: String },
  quantity: { type: Number, default: 1 },
});
const ShoppingCart = mongoose.model("ShoppingCart", schema);
const PORT = process.env.PORT || 8888;

app.get("/", (req, res) => {
  res.send("Connected to the server ");
});

app.get("/myShoppingCart", async (req, res) => {
  try {
    const items = await ShoppingCart.find({});
    res.json(items);
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/addToCart", async (req, res) => {
  try {
    const { id, image, title, price, quantity } = req.body;
    const newProduct = new ShoppingCart({
      id,
      image,
      title,
      price,
      quantity,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/deleteProduct/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    await ShoppingCart.findByIdAndDelete({ _id });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/updateQuantity/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const { quantity, price } = req.body;
    await ShoppingCart.findByIdAndUpdate(_id, { quantity, price });
    res.status(200).json({ message: "Quantity updated successfully" });
  } catch (err) {
    console.error("Error updating quantity:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
