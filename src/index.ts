import express from 'express';
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import { productRouter } from './api/product';
import { categoryRouter } from './api/category';
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import { connectDB } from './infrastructure/db';
import cors from "cors";
import { orderRouter } from "./api/order";
import { paymentsRouter } from './api/payment';
//console.log("Clerk Publishable Key:", process.env.CLERK_PUBLISHABLE_KEY);
//console.log("Clerk API Key:", process.env.CLERK_SECRET_KEY);
const app = express();

const port = 3000;

app.use(express.json()); // For parsing JSON requests*
// app.use((req, res, next) => {
//   console.log("Recieved a Request");
//   console.log(req.method, req.url);
//   next();
// });

app.use(cors({ origin: "http://localhost:5173" }));

app.use(clerkMiddleware())
app.use('/api/products',productRouter) // base routes and all the requests associated with it
app.use('/api/categories',categoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payments",paymentsRouter);
app.use(globalErrorHandlingMiddleware);
/*
app.get('/products/4',getProduct); //http://localhost:3000/products/4
app.get('/products/:id',getProduct); //to have a dynamic routing we can use http://localhost:3000/products/4
app.delete('/products/:id',deleteProduct); // delete a specific product by id

app.patch('/products/:id',updateProduct);
*/
connectDB(); // establish the connecttion to mongodb
app.listen(port, () => console.log(`Server running on port ${port}`));