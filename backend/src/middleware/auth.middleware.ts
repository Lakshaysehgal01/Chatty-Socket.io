import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";
export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({
        message: "Unauthorized - No token Provided",
      });
      return;
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload & {
      userId: string;
    };
    if (!decode) {
      res.status(401).json({
        message: "Unauthorized - Invalid Token ",
      });
      return;
    }
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found " });
      return;
    }
    //@ts-ignore
    req.user = user;
    next();
  } catch (e) {
    res.status(500).json({ message: "Internal server error " });
  }
};
