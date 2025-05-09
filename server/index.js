import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { errorMiddleware } from "./middlewares/error.js";
import http from "http";
import { initializeSocket } from "./socket/socket.js";
import userRoutes from "./routers/user.js";
import messageRoutes from "./routers/message.js";

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send(`Hello from home vijay`);
});
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);
app.use(errorMiddleware);

const server = http.createServer(app);

const io = initializeSocket(server);

const onlineUsers = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (!userId) return;
  // Add user to the socket map
  onlineUsers[userId] = socket.id;
  io.emit("onlineuser", Object.keys(onlineUsers));
    // Handle user disconnection
    socket.on("disconnect", () => {
      delete onlineUsers[userId];
      io.emit("onlineuser", Object.keys(onlineUsers));
    });
});

const getSocketId = (userId) =>{
  return onlineUsers[userId];
}

export { io, app, server, getSocketId };
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});