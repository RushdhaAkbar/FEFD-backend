import { CategoryDTO } from "../domain/dto/category";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import Category from "../infrastructure/schema/Category";
import { Request, Response, NextFunction } from "express";

/*const categories = [
    { _id: "ALL", name: "All" },
    { _id: "1", name: "Headphones" },
    { _id: "2", name: "Earbuds" },
    { _id: "3", name: "Speakers" },
    { _id: "4", name: "Mobile Phones" },
    { _id: "5", name: "Smart Watches" },
  ];
  */
  export const getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await Category.find();
      res.status(200).json(data);
      return;
    } catch (error) {
      next(error);
    }
  };

  export const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // const result:CategoryDTO = (req.body); //Only compile time even if its wronng type in req.body
      const result = CategoryDTO.safeParse(req.body); //runtime error checking=> safeParse will check the structure
      if (!result.success) {
        throw new ValidationError("Invalid category data");
      }
  
      await Category.create(result.data);
      res.status(201).send();
      return;
    } catch (error) {
      next(error);
    }
  };

  export const getCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const category = await Category.findById(id);
      if (!category) {
        throw new NotFoundError("Product not found");
      }
  
      res.status(200).json(category);
      return;
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const category = await Category.findByIdAndDelete(id);
  
      if (!category) {
        throw new NotFoundError("Product not found");
      }
      res.status(204);
      return;
    } catch (error) {
      next(error);
    }
  };

  export const updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const category = await Category.findByIdAndUpdate(id, req.body);
  
      if (!category) {
        throw new NotFoundError("Product not found");
      }
  
      res.status(200).send(category);
      return 
    } catch (error) {
      next(error);
    }
  };