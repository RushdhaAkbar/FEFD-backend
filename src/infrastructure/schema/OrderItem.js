import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
    productId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
   },
   
  });
  
  export default mongoose.model("OrderItem", OrderItemSchema);