import express from "express";
import {
    createInventory,
    getInventoryByProductId,
    updateInventory,
} from "../application/inventory";

export const inventoryRouter = express.Router();

// Create a new address
inventoryRouter.route("/").post(createInventory).get(getInventoryByProductId);
inventoryRouter.route("/update").patch(updateInventory);