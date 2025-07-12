import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import httpStatus from  "http-status"

import User from "../models/User.js"

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if(!username || !email || !password){
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Please provide all required information" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({ message: "User already exists with this username or email." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    
    const token = jwt.sign(
      { email: newUser.email, userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    res.status(httpStatus.OK).json({ 
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }, 
      token,
      message: "Successfully registered" 
    });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.BAD_REQUEST).json({ message: "Something went wrong", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  if(!email || !password){
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Please provide email and password" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(httpStatus.OK).json({ 
      user: {
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role
      }, 
      token,
      message: "Login successful" 
    });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.BAD_REQUEST).json({ message: "Something went wrong", error: error.message });
  }
};


