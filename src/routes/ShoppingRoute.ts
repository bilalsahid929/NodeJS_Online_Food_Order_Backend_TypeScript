import express from "express";
import {
  GetFoodAvailability,
  GetFoodsIn30Min,
  GetTopRestaurants,
  RestaurantsById,
  SearchFoods,
} from "../controllers";

const router = express.Router();

/**  -------------------- Food Availability ----------------------  **/
router.get("/:pincode", GetFoodAvailability);

/**  -------------------- Top Resturants ----------------------  **/
router.get("/top-restaurants/:pincode", GetTopRestaurants);

/**  -------------------- Foods Available in 30 Minutes ----------------------  **/
router.get("/foods-in-30-min/:pincode", GetFoodsIn30Min);

/**  -------------------- Search Foods ----------------------  **/
router.get("/search/:pincode", SearchFoods);

/**  -------------------- Find Resturants By ID ----------------------  **/
router.get("/restaurants/:id", RestaurantsById);

export { router as ShoppingRoute };
