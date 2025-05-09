import bcrypt from "bcryptjs";
import User from "../models/user.js";
import asyncHandler from "../utility/asyncHandler.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utility/errorHandler.js";

export const register = asyncHandler(async (req, res, next) => {
  const { fullName, username, password, gender } = req.body;

  if (!fullName || !username || !password || !gender) {
    return next(new errorHandler("All fields are required", 400));
  }

  const existingUser = await User.findOne({ username: username.toLowerCase() });
  if (existingUser) {
    return next(new errorHandler("Username already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarType = gender === "male" ? "boy" : "girl";
  const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;

  const newUser = await User.create({
    fullName,
    username: username.toLowerCase(),
    password: hashedPassword,
    gender,
    avatar,
  });

  const resUser = newUser.toObject();
  delete resUser.password;

  const tokenData = {
    _id: newUser?._id,
  };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  res
    .status(201)
    .cookie("chat_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json({
      success: true,
      responseData: resUser,
    });
});

export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new errorHandler("All fields are required", 400));
  }
  const currentUser = await User.findOne({ username });
  if (!currentUser) {
    return next(new errorHandler("Incorrect credentials", 400));
  }
  const isPasswordCorrect = await bcrypt.compare(
    password,
    currentUser.password
  );
  if (!isPasswordCorrect) {
    return next(new errorHandler("Incorrect credentials", 400));
  }
  const tokenData = {
    _id: currentUser?._id,
  };
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  const resUser = currentUser.toObject();
  delete resUser.password;

  res
    .status(200)
    .cookie("chat_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json({
      success: true,
      responseData: resUser,
    });
});

export const logout = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .cookie("chat_token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      responseData: {},
    });
});

export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const profile = await User.findById(userId).select("-password");
  if (!profile) {
    return next(new errorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    responseData: profile,
  });
});

export const getOtherUsers = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const otherUser = await User.find({ _id: { $ne: userId } });
  res.status(200).json({
    success: true,
    responseData: otherUser,
  });
});
