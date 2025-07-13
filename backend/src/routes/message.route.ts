import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import {
  getMessages,
  sendMessage,
  UsersForSidebar,
} from "../controllers/message.controller";

const router = express.Router();

router.get("/users", protectRoute, UsersForSidebar);

router.post("/send/:id",protectRoute,sendMessage);

router.get("/:id", protectRoute, getMessages);

export default router;
