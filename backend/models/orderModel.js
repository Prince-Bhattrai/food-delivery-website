import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now }, // ❗ Don't call Date.now()
  payment: { type: Boolean, default: false },
});

// Use singular model name ("Order"), Mongoose will auto-pluralize to "orders"
const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;