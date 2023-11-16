import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import {
  AddFood,
  GetFoods,
  GetVandorProfile,
  UpdateVandorProfile,
  UpdateVandorService,
  Vandorlogin,
} from "../controllers";
import { Authenticate } from "../middlewares";

const router = express.Router();

const imageStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "images");
  },
  filename(req, file, callback) {
    callback(null, new Date().toISOString() + "_" + file.originalname);
  },
});

const images = multer({ storage: imageStorage }).array("images", 10);

router.post("/login", Vandorlogin);

router.use(Authenticate);

router.get("/profile", GetVandorProfile);
router.patch("/profile", UpdateVandorProfile);

router.patch("/service", UpdateVandorService);

router.post("/food", images, AddFood);
router.get("/foods", GetFoods);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from vandor route" });
});

export { router as VandorRoute };
