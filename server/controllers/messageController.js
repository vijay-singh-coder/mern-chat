import { getSocketId, io } from "../index.js";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import asyncHandler from "../utility/asyncHandler.js";
import { errorHandler } from "../utility/errorHandler.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.user._id;
  const receiverId = req.params.receiverId; // Corrected spelling
  const message = req.body.message;

  if (!senderId || !receiverId || !message) {
    return next(new errorHandler("All fields required", 400));
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
      messages: [],
    });
  }

  let newMessage = await Message.create({
    senderId,
    receiverId, // Corrected spelling
    message,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
    await conversation.save();
  }

  const socketId = getSocketId(receiverId);
  io.to(socketId).emit("newMessage", newMessage);

  res.status(201).json({
    success: true,
    responseData: newMessage,
  });
});

export const getMessage = asyncHandler(async (req, res, next) => {
  const selfId = req.user._id;
  const otherUserId = req.params.otherParticipantId;
  if (!selfId || !otherUserId) {
    return next(new errorHandler("All fields required", 400));
  }
  const messageChat = await Conversation.findOne({
    participants: { $all: [selfId, otherUserId] },
  }).populate("messages");
  res.status(200).json({
    success: true,
    responseData: messageChat,
  });
});
