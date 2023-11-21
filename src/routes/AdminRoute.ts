import express, { Request, Response, NextFunction } from "express";
import { CreateVendor, GetVendorById, GetVendors } from "../controllers";

const router = express.Router();

router.post("/vendor", CreateVendor);
router.get("/vendor", GetVendors);
router.get("/vendor/:id", GetVendorById);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from admin route" });
});

export { router as AdminRoute };
