import express, { Request, Response, NextFunction } from "express";
import {
  GetVandorProfile,
  UpdateVandorProfile,
  UpdateVandorService,
  Vandorlogin,
} from "../controllers";
import { Authenticate } from "../middlewares";

const router = express.Router();

router.post("/login", Vandorlogin);

router.use(Authenticate);

router.get("/profile", GetVandorProfile);
router.patch("/profile", UpdateVandorProfile);

router.patch("/service", UpdateVandorService);

router.post("/food");
router.get("/foods");

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from vandor route" });
});

export { router as VandorRoute };
