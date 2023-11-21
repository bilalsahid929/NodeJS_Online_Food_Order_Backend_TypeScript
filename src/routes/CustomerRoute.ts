import express from "express";
import {
  AddToCart,
  CreateOrder,
  CustomerLogin,
  CustomerSignUp,
  CustomerVerify,
  DeleteCart,
  EditCustomerProfile,
  GetCart,
  GetCustomerProfile,
  GetOrderById,
  GetOrders,
  RequestOtp,
} from "../controllers";
import { Authenticate } from "../middlewares";

const router = express.Router();

/**  -------------------- Signup / Create Customer ----------------------  **/
router.post("/signup", CustomerSignUp);

/**  -------------------- Login ----------------------  **/
router.post("/login", CustomerLogin);

// authentication
router.use(Authenticate);

/**  -------------------- Verify Customer Account ----------------------  **/
router.patch("/verify", CustomerVerify);

/**  -------------------- OTP / Requesting OTP ----------------------  **/
router.get("/otp", RequestOtp);

/**  -------------------- Profile ----------------------  **/
router.get("/profile", GetCustomerProfile);

router.patch("/profile", EditCustomerProfile);

/**  -------------------- Cart ----------------------  **/
router.post("/cart", AddToCart);
router.get("/cart", GetCart);
router.delete("/cart", DeleteCart);

/**  -------------------- Order ----------------------  **/
router.post("/create-order", CreateOrder);
router.get("/orders", GetOrders);
router.get("/orders/:id", GetOrderById);
/**  -------------------- Payment ----------------------  **/

export { router as CustomerRoute };
