import { Request, Response } from "express";
import { userZodSchema } from "../lib/zod";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/util";

export const signup = async (req: Request, res: Response) => {
  const result = userZodSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      message: "Invalid fields",
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
        password: newUser.password,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({
        message: "Invalid user details ",
      });
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({
        message: `Errro in signup controller ${e.message}`,
      });
    } else {
      res.status(500).json({
        message: `Errro in signup controller ${e}`,
      });
    }
  }
};

export const login = (req: Request, res: Response) => {
  res.send("signup");
};

export const logout = (req: Request, res: Response) => {
  res.send("signup");
};
