import express from 'express';
import { getProducts,createProduct,getProduct,deleteProduct,updateProduct } from '../application/product'; // make sure to add .js when importing in js file but ts doesnt need it
/*
app.get('/products', getProducts);
app.post('/products',createProduct);


*/
// Instead of having induvidual routes we can group the routes using the base route
export const productRouter = express.Router();
productRouter.route('/').get(getProducts).post(createProduct);
//when additionally route is need define it seprately
productRouter.route('/:id').get(getProduct).delete(deleteProduct).patch(updateProduct);