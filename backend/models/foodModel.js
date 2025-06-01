import mongoose from "mongoose";

// Creating schema
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }
});

// Exporting model safely
const foodModel = mongoose.models.food || mongoose.model('food', foodSchema);
export default foodModel;
