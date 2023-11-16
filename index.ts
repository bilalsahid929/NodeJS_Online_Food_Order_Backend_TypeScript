import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { AdminRoute, VandorRoute } from "./routes";
import { MONGO_URI } from "./config";
import { connectDB } from "./config";
connectDB();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", AdminRoute);
app.use("/vandor", VandorRoute);
// mongoose
//   .connect(MONGO_URI)
//   .then((res) => console.log("res", res))
//   .catch((err) => console.log("err", err));
app.listen(8000, () => {
  console.clear();
  console.log("App is listening to the port 8000");
});
