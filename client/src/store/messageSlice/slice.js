import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./thunk";

const initialState = {
  buttonLoading: false,
  screenLoading: false,
  messages: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages(state, action) {
      const oldMessages = state.messages ?? [];
      state.messages = [...oldMessages, action.payload];
    },
  },
  extraReducers: (builder) => {
    //get messages
    builder
      .addCase(getMessageThunk.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(getMessageThunk.fulfilled, (state, action) => {
        state.messages = action.payload?.responseData?.messages;
        state.buttonLoading = false;
      })
      .addCase(getMessageThunk.rejected, (state) => {
        state.buttonLoading = false;
      });

    //send message
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        const oldMessages = state.messages ?? [];
        state.messages = [
          ...oldMessages,
          action.payload?.responseData,
        ];
        state.buttonLoading = false;
      })
      .addCase(sendMessageThunk.rejected, (state) => {
        state.buttonLoading = false;
      });
  },
});

export const { setMessages } = messageSlice.actions;

export default messageSlice.reducer;
