const express = require("express");

// Initialize the app
const app = express();

// Define a basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
