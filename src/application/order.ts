import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import ValidationError from "../domain/errors/validation-error";
import Order from "../infrastructure/schema/Order";
import NotFoundError from "../domain/errors/not-found-error";
import Address from "../infrastructure/schema/Address";
import Inventory from "../infrastructure/schema/Inventory";
import { CreateOrderDTO } from "../domain/dto/order";


export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
   
    const result = CreateOrderDTO.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError("Invalid order data");
    }

    const userId = (req as any).auth.userId;

    
    const address = await Address.create({
      ...result.data.shippingAddress,
    });

    
    for (const item of result.data.items) {
      const inventory = await Inventory.findOne({ productId: item.product._id });
      if (!inventory || inventory.quantity < item.quantity) {
        throw new Error(`Insufficient stock for product ${item.product._id}`);
      }
      inventory.quantity -= item.quantity;
      await inventory.save();
    }

    
    const order = new Order({
      userId,
      addressId: address._id,
      items: result.data.items,
      paymentStatus: "PENDING",
    });
    await order.save();

    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id).populate({
      path: "addressId",
      model: "Address",
    });
    if (!order) {
      throw new NotFoundError("Order not found");
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;


    const orders = await Order.find({ userId })
      .populate({
        path: "addressId",
        model: "Address",
      })
      .exec();

    if (!orders || orders.length === 0) {
      throw new NotFoundError("No orders found for this user");
    }

    
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};