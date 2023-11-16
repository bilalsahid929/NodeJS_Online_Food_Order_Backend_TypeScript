import mongoose from "mongoose";

import { MONGO_URI } from "../config";

const connectDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);

    process.exit(1);
  }
};
export { connectDB };
