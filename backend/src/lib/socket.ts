import { Server } from "socket.io";
import express from "express";
import http from "http";
type onlineUser = {
  [userId: string]: string;
};

const app = express();
const server = http.createServer(app);

const userSocketMap: onlineUser = {}; //store {userID:SocketId}
export function getUserSocketId(userId: string): string {
  return userSocketMap[userId];
}

const io = new Server(server, {
  cors: {
    origin: ["https://chatty-6.netlify.app/"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected ", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId && typeof userId == "string") {
    userSocketMap[userId] = socket.id;
  }

  //emit fxn  emits to all user
  io.emit("OnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected ", socket.id);
    if (typeof userId === "string") delete userSocketMap[userId];
    io.emit("OnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
