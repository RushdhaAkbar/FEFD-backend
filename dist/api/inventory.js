"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryRouter = void 0;
var express_1 = __importDefault(require("express"));
var inventory_1 = require("../application/inventory");
exports.inventoryRouter = express_1.default.Router();
// Create a new address
exports.inventoryRouter.route("/").post(inventory_1.createInventory).get(inventory_1.getInventoryByProductId);
exports.inventoryRouter.route("/update").patch(inventory_1.updateInventory);
//# sourceMappingURL=inventory.js.map