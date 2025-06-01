// import userModel from '../models/userModel.js';


// // Add items to user cart
// const addToCart = async (req, res) => {
//   try {
//     const userData = await userModel.findById(req.body.userId);
//     if (!userData) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     const cartData = userData.cartData || {};
//     const itemId = req.body.itemId;

//     cartData[itemId] = (cartData[itemId] || 0) + 1;

//     await userModel.findByIdAndUpdate(req.body.userId, { cartData });
//     res.status(200).json({ success: true, message: "Added to cart" });
//   } catch (error) {
//     console.error("Error in addToCart:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Remove items from user cart
// const removeFromCart = async (req, res) => {
//   try {
//     const userData = await userModel.findById(req.body.userId);
//     if (!userData) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     const cartData = userData.cartData || {};
//     const itemId = req.body.itemId;

//     if (cartData[itemId] > 1) {
//       cartData[itemId] -= 1;
//     } else {
//       delete cartData[itemId];
//     }

//     await userModel.findByIdAndUpdate(req.body.userId, { cartData });
//     res.status(200).json({ success: true, message: "Removed from cart" });
//   } catch (error) {
//     console.error("Error in removeFromCart:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Fetch user cart data
// const getCart = async (req, res) => {
//   try {
//     const userData = await userModel.findById(req.body.userId);
//     if (!userData) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     const cartData = userData.cartData || {};
//     res.status(200).json({ success: true, cartData });
//   } catch (error) {
//     console.error("Error in getCart:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// export { addToCart, removeFromCart, getCart };



// import userModel from '../models/userModel.js'


// //add items to user cart
// const addToCart = async(req, res)=>{
//     try {
//         let userData = await userModel.findById(req.body.userId)
//         let cartData = await userData.cartData;
//         if(!cartData[req.body.itemId]){
//             cartData[req.body.itemId]=1
//         }
//         else{
//             cartData[req.body.itemId]+=1;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId, {cartData})
//         res.json({success:true, message:"Added to cart"})

//     } catch (error) {
//         console.log("Error")  
//         res.json({success:false, message:"Error"})

//     }

// }

// //remove items from user cart
// const removeFromCart = async(req, res)=>{
//     try {
//         let userData = await userModel.findById(req.body.userId)
//         let cartData =  userData.cartData;
//         if(cartData[req.body.itemId]>0){
//             cartData[req.body.itemId]-=1;

//         }
//         await userModel.findByIdAndUpdate(req.body.userId, {cartData})
//         res.json({success:true, messsage:"removed from cart"})
//     } catch (error) {
//         console.log("Error")
//         res.json({success:false, message:"Error"})

//     }
// }


// //fetch user cart data 

// const getCart = async(req, res)=>{
//     try {
//         let userData = await userModel.findById(req.body.uerId);
//         let cartData = await userData.cartData;
//         res.json({success:true, cartData})
//     } catch (error) {
//         console.log("Error")
//         res.json({success:false, message:"Error"})
//     }


// }



import userModel from '../models/userModel.js';

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    console.log("UserId from token:", req.userId);
    console.log("ItemId to add:", req.body.itemId);

    const userData = await userModel.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    const itemId = req.body.itemId;

    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(req.userId, { cartData });
    res.status(200).json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    console.log("UserId from token:", req.userId);
    console.log("ItemId to remove:", req.body.itemId);

    const userData = await userModel.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    const itemId = req.body.itemId;

    if (cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else {
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });
    res.status(200).json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    console.log("UserId from token:", req.userId);

    const userData = await userModel.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.error("Error in getCart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addToCart, removeFromCart, getCart };
