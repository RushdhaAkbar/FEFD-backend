"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
var express_1 = __importDefault(require("express"));
var product_1 = require("../application/product");
var authentication_middleware_1 = require("./middleware/authentication-middleware");
var authorization_middleware_1 = require("./middleware/authorization-middleware");
exports.productRouter = express_1.default.Router();
exports.productRouter
    .route("/")
    .get(product_1.getProducts)
    .post(authentication_middleware_1.isAuthenticated, authorization_middleware_1.isAdmin, product_1.createProduct); //Remove isAuthenticated and isAdmin for using with Postman
exports.productRouter
    .route("/:id")
    .get(product_1.getProduct)
    .delete(authentication_middleware_1.isAuthenticated, authorization_middleware_1.isAdmin, product_1.deleteProduct)
    .patch(authentication_middleware_1.isAuthenticated, authorization_middleware_1.isAdmin, product_1.updateProduct);
//# sourceMappingURL=product.js.map