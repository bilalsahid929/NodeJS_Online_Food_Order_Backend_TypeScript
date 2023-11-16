import { Request, Response, NextFunction } from "express";
import { CreateFoodInputs, EditVandorInputs, VendorLoginInputs } from "../dto";
import { FindVandor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utility";
import { Food } from "../models";

export const Vandorlogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <VendorLoginInputs>req.body;
  const existigVandor = await FindVandor("", email);
  if (existigVandor !== null) {
    //validation
    const validation = await ValidatePassword(
      password,
      existigVandor.password,
      existigVandor.salt
    );
    if (validation) {
      const signature = GenerateSignature({
        _id: existigVandor.id,
        email: existigVandor.email,
        foodTypes: existigVandor.foodType,
        name: existigVandor.name,
      });
      return res.json(signature);
    } else {
      return res.json({ message: "Password is not valid" });
    }
  }
  return res.json({ message: "Login credential are not valid" });
};

export const GetVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const existingVandor = await FindVandor(user._id);
    return res.json(existingVandor);
  }
  return res.json({ message: "Vandor information Not found" });
};

export const UpdateVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { foodTypes, name, address, phone } = <EditVandorInputs>req.body;
  const user = req.user;
  if (user) {
    const existingVandor = await FindVandor(user._id);

    if (existingVandor !== null) {
      existingVandor.name = name;
      existingVandor.address = address;
      existingVandor.phone = phone;
      existingVandor.foodType = foodTypes;
      const savedResult = await existingVandor.save();
      return res.json(savedResult);
    }

    return res.json(existingVandor);
  }
  return res.json({ message: "Vandor information Not found" });
};
export const UpdateVandorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user) {
    const existingVandor = await FindVandor(user._id);

    if (existingVandor !== null) {
      existingVandor.serviceAvailable = !existingVandor.serviceAvailable;
      const savedResult = await existingVandor.save();
      return res.json(savedResult);
    }

    return res.json(existingVandor);
  }
  return res.json({ message: "Vandor information Not found" });
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
    const vandor = await FindVandor(user._id);
    if (vandor !== null) {
      const createdFood = await Food.create({
        vandorId: vandor._id,
        name: name,
        description: description,
        category: category,
        foodType: foodType,
        images: ["mock.jpg"],
        readyTime: readyTime,
        price: price,
        rating: 0,
      });
      vandor.foods.push(createdFood);
      const result = await vandor.save();
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
    const foods = await Food.find({ vandorId: user._id });
    if (foods !== null) {
      return res.json(foods);
    }
  }
  return res.json({ message: "Foods information Not found" });
};