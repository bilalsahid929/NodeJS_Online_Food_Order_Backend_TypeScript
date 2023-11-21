import express, { Request, Response, NextFunction } from "express";
import path from "path";
import multer from "multer";
import {
  AddFood,
  GetCurrentOrders,
  GetFoods,
  GetOrderDetails,
  GetVendorProfile,
  ProcessOrder,
  UpdateVendorCoverImage,
  UpdateVendorProfile,
  UpdateVendorService,
  Vendorlogin,
} from "../controllers";
import { Authenticate } from "../middlewares";

const router = express.Router();

const imageStorage = multer.diskStorage({
  destination(req, file, callback) {
    const destinationPath = path.join(__dirname, "../images");
    callback(null, destinationPath);
  },
  filename(req, file, callback) {
    callback(null, new Date().toISOString() + "_" + file.originalname);
  },
});

const images = multer({ storage: imageStorage }).array("images", 10);

router.post("/login", Vendorlogin);

router.use(Authenticate);

router.get("/profile", GetVendorProfile);
router.patch("/profile", UpdateVendorProfile);
router.patch("/coverimage", images, UpdateVendorCoverImage);
router.patch("/service", UpdateVendorService);

router.post("/food", images, AddFood);
router.get("/foods", GetFoods);

router.get("/orders", GetCurrentOrders);
router.put("/order/:id/process", ProcessOrder);
router.get("/order/:id", GetOrderDetails);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from vendor route" });
});

export { router as VendorRoute };
