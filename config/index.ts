import mongoose from "mongoose";

export const MONGO_URI =
  "mongodb+srv://bilalshahid929:bilal123@foodorderapp.9wl0e1s.mongodb.net/?retryWrites=true&w=majority";
export const APP_SECRET = "Our_App_Secret";

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
