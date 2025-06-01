// import userModel from "../models/userModel.js";
// import jwt from 'jsonwebtoken';
// import validator from 'validator';
// import bcrypt from 'bcrypt'; // ❌ FIXED: 'bycript' → 'bcrypt'
// import { response } from "express";

// // login user 
// const loginUser = async (req, res) => {
//   const {email , password}= req.body;
//   try {

//     const user = await userModel.findOne({email})
//     if(!user){
//         res.json({success:false, message:"User does'nt exist"})

//     }
//     const isMatch = await bcrypt.compare(password, user.password)
//     if(!isMatch){
//         return res.json({success:false, message:"Invalid Creadintals"})

//     }
//     const token = createToken(user._id);
//     res.json({success:true, token})

//   } catch (error) {
//     console.log(error)
//     res.json({success:false, message:"Error"})
//   }
// };

// // create token
// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET);
// };

// // register user
// const registerUser = async (req, res) => { // ❌ FIXED: added async
//   const { name, password, email } = req.body;

//   try {
//     // checking if user already exists
//     const exists = await userModel.findOne({ email });
//     if (exists) {
//       return res.json({ success: false, message: 'User already exists!' });
//     }

//     // validating email format and strong password
//     if (!validator.isEmail(email)) {
//       return res.json({ success: false, message: 'Please enter a valid email!' }); // ❌ FIXED: 'response' → 'res'
//     }

//     if (password.length < 8) {
//       return res.json({ success: false, message: "Please enter a strong password" }); // ❌ FIXED: 'response' → 'res'
//     }

//     // hashing user password
//     const salt = await bcrypt.genSalt(10); // ❌ FIXED: 'bycript' → 'bcrypt'
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new userModel({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     const user = await newUser.save();
//     const token = createToken(user._id);
//     res.json({ success: true, token });

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// export { loginUser, registerUser };










import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrypt from 'bcrypt';

// login user 
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid Credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: 'User already exists!' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email!' });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Please enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { loginUser, registerUser };
