// import Stripe from "stripe"; 
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// import 'dotenv/config'

// const placeOrder = async (req, res) => {
//   const frontend_url = process.env.FRONTEND_URL || "http://localhost:3000";

//   try {
//     const newOrder = new orderModel({
//       userId: req.body.userId,
//       items: req.body.items,
//       amount: req.body.amount,
//       address: req.body.address,
//     });

//     await newOrder.save();

//     await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//     // Assuming item.price is in USD, pass unit_amount in cents
//     const line_items = req.body.items.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: Math.round(item.price * 100),
//       },
//       quantity: item.quantity,
//     }));

//     line_items.push({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: "Delivery Charges",
//         },
//         unit_amount: Math.round(2 * 100), // $2 delivery charge
//       },
//       quantity: 1,
//     });

//     const session = await stripe.checkout.sessions.create({
//       line_items,
//       mode: "payment",
//       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//     });

//     res.json({ success: true, session_url: session.url });

//   } catch (error) {
//     console.error("Stripe Checkout Error:", error.message);
//     res.status(500).json({ success: false, message: "Order placement failed" });
//   }
// };


// export {placeOrder}


// import Stripe from "stripe"; 
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// import 'dotenv/config';
// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import { response } from "express";

// const placeOrder = async (req, res) => {
//   const frontend_url = /*process.env.FRONTEND_URL ||*/ "http://localhost:5173/";

//   try {
//     const userId = req.userId;  // ✅ Corrected from middleware
//     console.log("User ID from token (middleware):", userId);
//     console.log("Request Body:", req.body);

//     const newOrder = new orderModel({
//       userId: userId,
//       items: req.body.items,
//       amount: req.body.amount,
//       address: req.body.address,
//     });

//     await newOrder.save();

//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     const line_items = req.body.items.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: Math.round(item.price * 100),
//       },
//       quantity: item.quantity,
//     }));

//     line_items.push({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: "Delivery Charges",
//         },
//         unit_amount: 200,
//       },
//       quantity: 1,
//     });

//     const session = await stripe.checkout.sessions.create({
//       line_items,
//       mode: "payment",
//       success_url: `${frontend_url}verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${frontend_url}verify?success=false&orderId=${newOrder._id}`,
//     });

//     res.json({ success: true, session_url: session.url });

//   } catch (error) {
//     console.error("Stripe Checkout Error:", error.message);
//     res.status(500).json({ success: false, message: "Order placement failed" });
//   }
// };

// const veryfyOrder = async (req, res)=>{
//     const{orderId, success}= req.body;
//     try{
//         if (success=="true"){
//             await orderModel.findByIdAndUpdate(orderId,{payment:true})
//             res.json({success:true, message:"Paid"})

//         }else{
//             await orderModel.findByIdAndDelete(orderId)
//             res.json({success:false, message:"Not paid"})

//         }
//     }catch(error){
//         console.log(error);
//         res.json({success:false, message:"Error"})
//     }

// }


// //users orders for frontend 
// const userOrders = async(req, res)=>{
//     try {
//         const orders = await orderModel.find({userId:req.body.userId})
//         res.json({success:true, data:orders})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:"Error"})
//     }

// }




// l

// const listOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({});
//     res.json({ success: true, data: orders });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// }


// //api for order status

// const updateStatus = async (req, res) => {
//   try {
//     await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
//     res.json({ success: true, message: "Status Updated" });
//   } catch (error) {
//     console.log("Error:", error);
//     res.json({ success: false, message: "Error updating status" });
//   }
// };S



// export { placeOrder, veryfyOrder, userOrders,updateStatus, listOrders};






import Stripe from "stripe"; 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import 'dotenv/config';
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Place a new order and create Stripe session
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173/";

  try {
    const userId = req.userId;
    console.log("User ID from token (middleware):", userId);
    console.log("Request Body:", req.body);

    const newOrder = new orderModel({
      userId: userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error("Stripe Checkout Error:", error.message);
    res.status(500).json({ success: false, message: "Order placement failed" });
  }
};

// Verify order after payment
const veryfyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Fetch all orders for a user
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


// Admin: List all orders
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Admin: Update order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log("Error:", error);
    res.json({ success: false, message: "Error updating status" });
  }
};

export { placeOrder, veryfyOrder, userOrders, updateStatus, listOrders };
