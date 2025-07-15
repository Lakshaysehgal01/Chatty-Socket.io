import { Request, Response } from "express";
import { loginZodSchema, userZodSchema } from "../lib/zod";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/util";
import cloudinary from "../lib/cloudinary";

export const signup = async (req: Request, res: Response) => {
  const result = userZodSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      message: result.error.issues[0].message,
    });
    return;
  }
  const { email, fullName, password, profilePic } = result.data;
  try {
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      res.status(400).json({
        message: "Email already exists",
      });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      fullName,
      profilePic,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        message: "Invalid user details ",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error " });
  }
};

export const login = async (req: Request, res: Response) => {
  const result = loginZodSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      message: result.error.issues[0].message,
    });
    return;
  }
  try {
    const { email, password } = result.data;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(403).json({ message: "Incorrect credentials" });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser?.password as string
    );
    if (!isPasswordCorrect) {
      res.status(403).json({ message: "Incoorect Password" });
      return;
    }
    generateToken(existingUser._id, res);
    res.status(200).json({
      message: "Login succesfull",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error " });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      message: "Logout successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error " });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user?._id;
    if (!profilePic) {
      res.status(400).json({
        message: "Profile pic is required",
      });
      return;
    }
    const uploadedRes = await cloudinary.uploader.upload(profilePic, {
      folder: "profile_pics",
    });
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadedRes.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error ",
    });
  }
};

export const checkAuth = (req: Request, res: Response) => {
  try {
    res.status(200).json(req.user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
