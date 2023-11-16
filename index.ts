import express from "express";
import bodyParser from "body-parser";
import path from "path";

import { AdminRoute, VandorRoute } from "./routes";
import { connectDB } from "./config";

connectDB();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/admin", AdminRoute);
app.use("/vandor", VandorRoute);

app.listen(8000, () => {
  console.clear();
  console.log("App is listening to the port 8000");
});
