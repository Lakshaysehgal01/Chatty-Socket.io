import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Message } from "../models/message.model";
import cloudinary from "../lib/cloudinary";

export const UsersForSidebar = async (req: Request, res: Response) => {
  try {
    const loggedUser = req.user?._id;
    const filteredUser = await User.find({ _id: { $ne: loggedUser } }).select(
      "-password"
    );
    res.status(201).json(filteredUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const myId = req.user?._id;
    const { id: userToChatId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: myId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: myId },
      ],
    });
    res.status(201).json(messages);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user?._id;

    let imageUrl;
    if (image) {
      const Uploadresponse = await cloudinary.uploader.upload(image, {
        folder: "message_photos",
      });
      imageUrl = Uploadresponse.secure_url;
    }

    const newMessage =await Message.create({
      senderId,
      recieverId,
      text,
      image: imageUrl,
    });

    //socket.io work

    res.status(201).json(newMessage);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal server error ",
    });
  }
};
