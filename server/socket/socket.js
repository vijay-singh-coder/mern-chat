import { Server } from "socket.io";

const userSocketMap = new Map();

export const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:5173",
        },
    });

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;
        if (!userId) return;

        // Add user to the socket map
        userSocketMap.set(userId, socket.id);
        io.emit("onlineuser", [...userSocketMap.keys()]);

        // Handle user disconnection
        socket.on("disconnect", () => {
            userSocketMap.delete(userId);
            io.emit("onlineuser", [...userSocketMap.keys()]);
        });
    });

    return io;
};

export const getSocketId = (userId) => {
    return userSocketMap.get(userId);
};