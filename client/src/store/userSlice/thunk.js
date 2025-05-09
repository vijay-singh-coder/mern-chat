import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axiosInstance";
import toast from "react-hot-toast";

export const loginUserThunk = createAsyncThunk(
  "loginUserThunk",
  async (login, { rejectWithValue }) => {
    try {
      const response = await API.post("/user/login", login);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.errMessage || error.message || "Login failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const signupUserThunk = createAsyncThunk(
  "signupUserThunk",
  async (login, { rejectWithValue }) => {
    try {
      const response = await API.post("/user/register", login);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.errMessage || error.message || "Login failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "logoutUserThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.post("/user/logout");
      toast.success("Logout successfully");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.errMessage || error.message || "Login failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getProfileUserThunk = createAsyncThunk(
  "getProfileUserThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/user/get-profile");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.errMessage || error.message || "Login failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getOtherUserThunk = createAsyncThunk(
  "getOtherUserThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/user/get-other-users");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.errMessage || error.message || "Login failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
