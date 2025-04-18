"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInventory = exports.getInventoryByProductId = exports.createInventory = void 0;
var Inventory_1 = __importDefault(require("../infrastructure/schema/Inventory"));
var Product_1 = __importDefault(require("../infrastructure/schema/Product"));
var not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
var validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
var createInventory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productId, quantity, productExists, existingInventory, inventory, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, productId = _a.productId, quantity = _a.quantity;
                return [4 /*yield*/, Product_1.default.findById(productId)];
            case 1:
                productExists = _b.sent();
                if (!productExists) {
                    throw new not_found_error_1.default("Product not found");
                }
                return [4 /*yield*/, Inventory_1.default.findOne({ productId: productId })];
            case 2:
                existingInventory = _b.sent();
                if (existingInventory) {
                    throw new validation_error_1.default("Inventory already exists for this product");
                }
                return [4 /*yield*/, Inventory_1.default.create({ productId: productId, quantity: quantity })];
            case 3:
                inventory = _b.sent();
                res.status(201).json(inventory);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createInventory = createInventory;
var getInventoryByProductId = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, inventory, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                productId = req.query.productId;
                if (!productId) {
                    throw new validation_error_1.default("Product ID is required");
                }
                return [4 /*yield*/, Inventory_1.default.findOne({ productId: productId }).populate("productId")];
            case 1:
                inventory = _a.sent();
                if (!inventory) {
                    throw new not_found_error_1.default("Inventory not found for this product");
                }
                res.status(200).json(inventory);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getInventoryByProductId = getInventoryByProductId;
var updateInventory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var items, _i, items_1, item, inventory, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                items = req.body.items;
                console.log("Received request body:", req.body);
                _i = 0, items_1 = items;
                _a.label = 1;
            case 1:
                if (!(_i < items_1.length)) return [3 /*break*/, 5];
                item = items_1[_i];
                return [4 /*yield*/, Inventory_1.default.findOne({ productId: item.productId })];
            case 2:
                inventory = _a.sent();
                if (!inventory) {
                    throw new not_found_error_1.default("Inventory not found for product ".concat(item.productId));
                }
                if (inventory.quantity < item.quantity) {
                    throw new validation_error_1.default("Not enough stock for product ".concat(item.productId));
                }
                inventory.quantity -= item.quantity; // Deduct stock
                return [4 /*yield*/, inventory.save()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 1];
            case 5:
                res.status(200).json({ message: "Inventory updated successfully" });
                return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateInventory = updateInventory;
//# sourceMappingURL=inventory.js.map