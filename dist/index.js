"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var express_2 = require("@clerk/express");
var product_1 = require("./api/product");
var category_1 = require("./api/category");
var global_error_handling_middleware_1 = __importDefault(require("./api/middleware/global-error-handling-middleware"));
var db_1 = require("./infrastructure/db");
var cors_1 = __importDefault(require("cors"));
var order_1 = require("./api/order");
var payment_1 = require("./api/payment");
var inventory_1 = require("./api/inventory");
var payment_2 = require("./application/payment");
var body_parser_1 = __importDefault(require("body-parser"));
//console.log("Clerk Publishable Key:", process.env.CLERK_PUBLISHABLE_KEY);
//console.log("Clerk API Key:", process.env.CLERK_SECRET_KEY);
var app = (0, express_1.default)();
app.use(express_1.default.json()); // For parsing JSON requests*
// app.use((req, res, next) => {
//   console.log("Recieved a Request");
//   console.log(req.method, req.url);
//   next();
// });
//app.use(cors({ origin: "https://fed-storefront-frontend-rushdha.netlify.app"}));
app.use((0, cors_1.default)({ origin: process.env.FRONTEND_URL }));
app.use((0, express_2.clerkMiddleware)());
app.post("/api/stripe/webhook", body_parser_1.default.raw({ type: "application/json" }), payment_2.handleWebhook);
app.use(express_1.default.json());
app.use('/api/products', product_1.productRouter); // base routes and all the requests associated with it
app.use('/api/categories', category_1.categoryRouter);
app.use("/api/orders", order_1.orderRouter);
app.use("/api/payments", payment_1.paymentsRouter);
app.use("/api/inventories", inventory_1.inventoryRouter);
app.use(global_error_handling_middleware_1.default);
/*
app.get('/products/4',getProduct); //http://localhost:3000/products/4
app.get('/products/:id',getProduct); //to have a dynamic routing we can use http://localhost:3000/products/4
app.delete('/products/:id',deleteProduct); // delete a specific product by id

app.patch('/products/:id',updateProduct);
*/
(0, db_1.connectDB)(); // establish the connecttion to mongodb
var PORT = process.env.PORT || 8000;
app.listen(PORT, function () { return console.log("Server running on port ".concat(PORT)); });
//# sourceMappingURL=index.js.map