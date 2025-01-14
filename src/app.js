import express from 'express';
import { productRouter } from './api/product.js';
import { categoryRouter } from './api/category.js';
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware.js";
const app = express();

const port = 3000;

app.use(express.json()); // For parsing JSON requests*
// app.use((req, res, next) => {
//   console.log("Recieved a Request");
//   console.log(req.method, req.url);
//   next();
// });




app.use('/api/products',productRouter) // base routes and all the requests associated with it
app.use('/api/categories',categoryRouter);
app.use(globalErrorHandlingMiddleware)
/*
app.get('/products/4',getProduct); //http://localhost:3000/products/4
app.get('/products/:id',getProduct); //to have a dynamic routing we can use http://localhost:3000/products/4
app.delete('/products/:id',deleteProduct); // delete a specific product by id

app.patch('/products/:id',updateProduct);
*/

app.listen(port, () => console.log(`Server running on port ${port}`));