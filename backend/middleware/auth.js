// import jwt from 'jsonwebtoken';


// const authMiddleware = async (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(' ')[1];

//     console.log("🔐 Incoming token:", token);

//     if (!token) {
//         console.log("❌ Token missing.");
//         return res.status(401).json({ success: false, message: "Not authorized. Please login again." });
//     }

//     try {
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("✅ Token valid. User ID:", token_decode.id);
//         req.userId = token_decode.id;  // safer place to put user id
//         next();
//     } catch (error) {
//         console.error("❌ JWT verification failed:", error.message);
//         return res.status(401).json({ success: false, message: "Invalid token." });
//     }
// };

// export default authMiddleware;


import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🔐 Incoming token:", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;  // attach userId to request
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default authMiddleware;








// import { response } from "express";
// import jwt from "jsonwebtoken"


// const authMiddleware = async (req, res, next) => {
//     const { token } = req.headers;
//     if (!token) {
//         return response.json({ success: false, message: "Not authorized login again." })
//         try {
//             const token_decode = jwt.verify(token, process.env.JWT_SECRET)
//             req.body.userId = token_decode.id;

//         } catch (error) {
//             console.log(error)
//             res.json({success:false, message:'error'})
//         }
//     }
// }
//     
