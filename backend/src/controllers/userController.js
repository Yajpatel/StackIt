import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import httpStatus from  "http-status"

import User from "../models/User.js"




export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if(!username || !email || !password){
      return res.status(httpStatus.BAD_REQUEST).json({ msg: "provide Every Info" });
  }

  try {
    const existinguser = await User.findOne({ username });
    if (existinguser) {
      return res.status(httpStatus.CONFLICT).json({ msg: "User already Exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log()
    
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(httpStatus.OK).json({ result: newUser, token , msg:"Sucessffully registraion" });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({msg:"Something went worng" , stack : error});
  }
};


export const login = async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password){
      return res.status(httpStatus.BAD_REQUEST).json({ msg: "provide Every Info" });
  }

  try {
    // 🛠 Fix: find by email
    const existinguser = await User.findOne({ username });
    if (!existinguser) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User doesn't exist." });
    }

    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(httpStatus.OK).json({ result: existinguser, token });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.BAD_REQUEST).json({ msg: "Something went wrong", error: error.message });
  }
};


