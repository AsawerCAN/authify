// import mongoose from "mongoose";
// import { MONGO_URI } from "../constants/env";

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.log("MongoDB connection failed", error);
//     process.exit(1);
//   }
// };

// export default connectToDatabase;

import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectToDatabase;
