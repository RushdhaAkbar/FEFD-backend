import { Request, Response, NextFunction } from "express";
import Inventory from "../infrastructure/schema/Inventory";
import Product from "../infrastructure/schema/Product";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";


export const createInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { productId, quantity } = req.body;

    const productExists = await Product.findById(productId);
    if (!productExists) {
      throw new NotFoundError("Product not found");
    }

    const existingInventory = await Inventory.findOne({ productId });
    if (existingInventory) {
      existingInventory.quantity += quantity; // Add new quantity to existing
      await existingInventory.save();
      res.status(200).json(existingInventory);
    } else {
      const inventory = await Inventory.create({ productId, quantity });
      res.status(201).json(inventory);
    }
  } catch (error) {
    next(error);
  }
};



export const getInventoryByProductId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { productId } = req.query; 
      if (!productId) {
        throw new ValidationError("Product ID is required");
      }
  
      const inventory = await Inventory.findOne({ productId }).populate("productId");
  
      if (!inventory) {
        throw new NotFoundError("Inventory not found for this product");
      }
  
      res.status(200).json(inventory);
    } catch (error) {
      next(error);
    }
  };
  

  export const updateInventory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { items } = req.body; // Receive ordered items from frontend
      console.log("Received request body:", req.body);

      for (const item of items) {
        const inventory = await Inventory.findOne({ productId: item.productId });
  
        if (!inventory) {
          throw new NotFoundError(`Inventory not found for product ${item.productId}`);
        }
  
        if (inventory.quantity < item.quantity) {
          throw new ValidationError(`Not enough stock for product ${item.productId}`);
        }
  
        inventory.quantity -= item.quantity; // Deduct stock
        await inventory.save();
      }
  
      res.status(200).json({ message: "Inventory updated successfully" });
    } catch (error) {
      next(error);
    }
  };
  
  
  
