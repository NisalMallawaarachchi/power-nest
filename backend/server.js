import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";

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

// Use product routes
app.use("/api/products", productRoutes);

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
