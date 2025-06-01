import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js'; // make sure this file exports connectDB
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import orderModel from './models/orderModel.js';
import 'dotenv/config';

// App config
const app = express();
const port = process.env.PORT || 4000;  // Use env PORT if available

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB()
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// API Endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Root Route
app.get('/', (req, res) => {
  res.json({ status: 1, msg: 'API is working' });
});
console.log("Loaded Stripe key:", process.env.STRIPE_SECRET_KEY);
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
