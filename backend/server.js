import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import Product from "./models/product.model.js";

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

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
