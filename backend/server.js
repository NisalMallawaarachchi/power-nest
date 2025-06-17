import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import Product from "./models/product.model.js";
import mongoose, { mongo } from "mongoose";

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Initialize the app
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({}); //{} Fetch all products from the database
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  const product = req.body;
  if (!product.price || !product.name || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (mongoose.Types.ObjectId.isValid(id) === false) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    await Product.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });
    res
      .status(200)
      .json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
