import express from "express";
import dotenv from "dotenv";

dotenv.config();

import App from "./services/ExpressApp";
import { connectDB } from "./services/Database";
import { PORT } from "./config";
const StartServer = async () => {
  const app = express();

  await connectDB();

  await App(app);

  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
};

StartServer();
