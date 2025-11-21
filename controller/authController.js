// Load environment variables first
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/Auth.js"; //  Make sure path is correct
import requireAuth from "../middleware/authMiddleware.js";

const router = express.Router();

//  Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

//  Register User
router.post("/signup", async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  //  Validation
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    //  Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    await newUser.save();

    // Generate Token
    // const token = generateToken(newUser._id);

    // ✅ Send success response
    res.status(201).json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profileImageUrl: newUser.profileImageUrl,
      },
      // token,
    });
  } catch (error) {
    console.error(" Error registering user:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});

//  Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //  Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    //  Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //  Check password (ensure your User model has comparePassword method)
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //  Generate Token
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
      },
      token,

    });
  } catch (err) {
    console.error(" Error during login:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

//  Get User Info
router.get("/getUser" ,requireAuth, async (req, res) => {
 try {

// console.log("Decoded user:", req.user);

  if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "User ID not found in token" });
    }

    const user = await User.findById(req.user.id).select("fullName profileImageUrl");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});


router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
