import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "OrderItem",
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: "Pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    
  });
  export default mongoose.model("Order", OrderSchema);