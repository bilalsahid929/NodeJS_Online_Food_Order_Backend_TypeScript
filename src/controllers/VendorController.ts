import { Request, Response, NextFunction } from "express";
import { CreateFoodInputs, EditVendorInputs, VendorLoginInputs } from "../dto";
import { FindVendor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utility";
import { Food, Order } from "../models";

export const Vendorlogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <VendorLoginInputs>req.body;
  const existigVendor = await FindVendor("", email);
  if (existigVendor !== null) {
    //validation
    const validation = await ValidatePassword(
      password,
      existigVendor.password,
      existigVendor.salt
    );
    if (validation) {
      const signature = GenerateSignature({
        _id: existigVendor.id,
        email: existigVendor.email,
        foodTypes: existigVendor.foodType,
        name: existigVendor.name,
      });
      return res.json(signature);
    } else {
      return res.json({ message: "Password is not valid" });
    }
  }
  return res.json({ message: "Login credential are not valid" });
};

export const GetVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const existingVendor = await FindVendor(user._id);
    return res.json(existingVendor);
  }
  return res.json({ message: "Vendor information Not found" });
};

export const UpdateVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { foodTypes, name, address, phone } = <EditVendorInputs>req.body;
  const user = req.user;
  if (user) {
    const existingVendor = await FindVendor(user._id);

    if (existingVendor !== null) {
      existingVendor.name = name;
      existingVendor.address = address;
      existingVendor.phone = phone;
      existingVendor.foodType = foodTypes;
      const savedResult = await existingVendor.save();
      return res.json(savedResult);
    }

    return res.json(existingVendor);
  }
  return res.json({ message: "Vendor information Not found" });
};

export const UpdateVendorCoverImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  const vendor = await FindVendor(user?._id);

  if (vendor !== null) {
    const files = req.files as [Express.Multer.File];

    const images = files?.map((file: Express.Multer.File) => file.filename);

    vendor.coverImages.push(...images);

    const result = await vendor.save();

    return res.json(result);
  }

  return res.json({ message: "Something wend wrong with the cover image" });
};

export const UpdateVendorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const existingVendor = await FindVendor(user._id);

    if (existingVendor !== null) {
      existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
      const savedResult = await existingVendor.save();
      return res.json(savedResult);
    }

    return res.json(existingVendor);
  }
  return res.json({ message: "Vendor information Not found" });
};

export const AddFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const { name, description, category, foodType, readyTime, price } = <
      CreateFoodInputs
    >req.body;

    const vendor = await FindVendor(user._id);

    if (vendor !== null) {
      const files = req.files as [Express.Multer.File];

      const images = files.map((file: Express.Multer.File) => file.filename);

      const createdFood = await Food.create({
        vendorId: vendor._id,
        name: name,
        description: description,
        category: category,
        foodType: foodType,
        images: images,
        readyTime: readyTime,
        price: price,
        rating: 0,
      });

      vendor.foods.push(createdFood);

      const result = await vendor.save();

      return res.json(result);
    }
  }
  return res.json({ message: "Something wend wrong with the food" });
};

export const GetFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const foods = await Food.find({ vendorId: user._id });
    if (foods !== null) {
      return res.json(foods);
    }
  }
  return res.json({ message: "Foods information Not found" });
};

export const GetCurrentOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  console.log("user", user);
  if (user) {
    const orders = await Order.find({ vendorId: user._id }).populate(
      "items.food"
    );

    if (orders !== null) {
      return res.status(200).json(orders);
    }
  }

  return res.json({ message: "Orders Not found" });
};

export const GetOrderDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId = req.params.id;

  if (orderId) {
    const order = await Order.findById(orderId).populate("items.food");

    if (order != null) {
      return res.status(200).json(order);
    }
  }

  return res.json({ message: "Order Not found" });
};

export const ProcessOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId = req.params.id;

  const { status, remarks, time } = req.body;

  if (orderId) {
    const order = await Order.findById(orderId);
    // .populate("food");

    order.orderStatus = status;
    order.remarks = remarks;
    if (time) {
      order.readyTime = time;
    }

    const orderResult = await order.save();

    if (orderResult != null) {
      return res.status(200).json(orderResult);
    }
  }

  return res.json({ message: "Unable to process order" });
};
