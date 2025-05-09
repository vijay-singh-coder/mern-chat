import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/slice";
import messageReducer from "./messageSlice/slice";
import socketReducer from "./socketSlice/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredPaths: ["socket.socket"] },
    }),
});
