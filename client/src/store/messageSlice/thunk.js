import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axiosInstance";
import toast from "react-hot-toast";

export const getMessageThunk = createAsyncThunk(
  "getMessageThunk",
  async (otherParticipantId, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/message/get-messages/${otherParticipantId}`
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.errMessage ||
        error.message ||
        "Message getting failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const sendMessageThunk = createAsyncThunk(
  "sendMessageThunk",
  async ({ recieverId, message }, { rejectWithValue }) => {
    try {
      const response = await API.post(`/message/send/${recieverId}`, {
        message,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.errMessage ||
        error.message ||
        "Message sending failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
