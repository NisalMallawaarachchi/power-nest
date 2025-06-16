import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // The `await` keyword pauses execution until the promise is resolved.
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1); // process code 1 means exit with failure and 0 means exit with success
  }
};

export default connectDB;
