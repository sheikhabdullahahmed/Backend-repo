import User from '../models/Auth.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

//Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

// Register User
const registerUser = async (req, res) => {
  const {fullName, email, password, profileImageUrl} = req.body;

  //validation
  if(!fullName || !email || !password){
    return res.status(400).json({message: "Please fill all required fields"});
  }

  try {
    //check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({message: "User already exists"});
    } 

    //create new user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl
    });
    res.status(201).json({
      message: "User registered successfully",
      id: user._id,
      user,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const {email, password} = req.body;

  //validation
  if(!email || !password){
    return res.status(400).json({message: "Please fill all required fields"});
  }

  try{
    //check if user exists
    const user = await User.findOne({email});
    if(!user){
      return  res.status(400).json({message: "Invalid email or password"});
    } 

    res.status(200).json({
      message: "User logged in successfully",
      id: user._id,
      user,
      token: generateToken(user)
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Error logging in user" });
  }
};

// Get User Info
const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User information retrieved successfully",
      user
    });
  } catch (error) {
      console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export {registerUser, loginUser, getUserInfo};