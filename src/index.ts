import express from "express";
import App from "./services/ExpressApp";
import { connectDB } from "./services/Database";
import dotenv from "dotenv";
import { PORT } from "./config";

const StartServer = async () => {
  dotenv.config();

  const app = express();

  await connectDB();

  await App(app);

  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
};

StartServer();
