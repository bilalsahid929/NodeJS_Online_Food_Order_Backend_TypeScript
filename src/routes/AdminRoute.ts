import express, { Request, Response, NextFunction } from "express";
import { CreateVandor, GetVandorById, GetVandors } from "../controllers";

const router = express.Router();

router.post("/vandor", CreateVandor);
router.get("/vandor", GetVandors);
router.get("/vandor/:id", GetVandorById);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello from admin route" });
});

export { router as AdminRoute };
