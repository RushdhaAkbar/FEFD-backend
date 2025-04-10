"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getUserOrders = exports.getOrder = exports.createOrder = void 0;
var validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
var Order_1 = __importDefault(require("../infrastructure/schema/Order"));
var not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
var Address_1 = __importDefault(require("../infrastructure/schema/Address"));
var Inventory_1 = __importDefault(require("../infrastructure/schema/Inventory"));
var order_1 = require("../domain/dto/order");
var Product_1 = __importDefault(require("../infrastructure/schema/Product"));
var createOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result, userId, address, items, _i, _a, item, inventory, order, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                result = order_1.CreateOrderDTO.safeParse(req.body);
                if (!result.success) {
                    throw new validation_error_1.default("Invalid order data");
                }
                userId = req.auth.userId;
                return [4 /*yield*/, Address_1.default.create(__assign({}, result.data.shippingAddress))];
            case 1:
                address = _b.sent();
                return [4 /*yield*/, Promise.all(result.data.items.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                        var product;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Product_1.default.findById(item.product._id)];
                                case 1:
                                    product = _a.sent();
                                    console.log(product);
                                    return [2 /*return*/, __assign(__assign({}, item), { product: __assign(__assign({}, item.product), { stripePriceId: product === null || product === void 0 ? void 0 : product.stripePriceId }) })];
                            }
                        });
                    }); }))];
            case 2:
                items = _b.sent();
                _i = 0, _a = result.data.items;
                _b.label = 3;
            case 3:
                if (!(_i < _a.length)) return [3 /*break*/, 7];
                item = _a[_i];
                return [4 /*yield*/, Inventory_1.default.findOne({ productId: item.product._id })];
            case 4:
                inventory = _b.sent();
                if (!inventory || inventory.quantity < item.quantity) {
                    throw new Error("Insufficient stock for product ".concat(item.product._id));
                }
                inventory.quantity -= item.quantity;
                return [4 /*yield*/, inventory.save()];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7: return [4 /*yield*/, Order_1.default.create({
                    userId: userId,
                    items: items,
                    addressId: address._id,
                })];
            case 8:
                order = _b.sent();
                res.status(201).json({ orderId: order._id });
                return [3 /*break*/, 10];
            case 9:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.createOrder = createOrder;
var getOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Order_1.default.findById(id).populate({
                        path: "addressId",
                        model: "Address",
                    })];
            case 1:
                order = _a.sent();
                if (!order) {
                    throw new not_found_error_1.default("Order not found");
                }
                res.status(200).json(order);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrder = getOrder;
var getUserOrders = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, orders, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                return [4 /*yield*/, Order_1.default.find({ userId: userId })
                        .populate({
                        path: "addressId",
                        model: "Address",
                    })
                        .exec()];
            case 1:
                orders = _a.sent();
                if (!orders || orders.length === 0) {
                    throw new not_found_error_1.default("No orders found for this user");
                }
                res.status(200).json(orders);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserOrders = getUserOrders;
//# sourceMappingURL=order.js.map