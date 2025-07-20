import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import messageRoutes from "./routes/message.route";
import { ConnectDb } from "./lib/db";
import cookieParser from "cookie-parser";
dotenv.config({ quiet: true });
import cors from "cors";
import { app, server } from "./lib/socket";

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/message", messageRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  ConnectDb();
});
