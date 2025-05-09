import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  signupUserThunk,
  logoutUserThunk,
  getProfileUserThunk,
  getOtherUserThunk,
} from "./thunk";

const initialState = {
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")),
  isAuthenticated: false,
  otherUserProfile: null,
  screenLoading: true,
  buttonLoading: false,
  userProfile: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser(state, action) {
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      state.selectedUser = action.payload;
    },
  },

  extraReducers: (builder) => {
    //login user
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.buttonLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.buttonLoading = false;
        // state.isAuthenticated = action.payload?.success || false;
        state.userProfile = action.payload?.responseData;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.buttonLoading = false;
        state.error = action.payload || "Failed to login";
        state.isAuthenticated = false;
      });

    //signup user
    builder
      .addCase(signupUserThunk.pending, (state) => {
        state.buttonLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(signupUserThunk.fulfilled, (state, action) => {
        state.buttonLoading = false;
        state.isAuthenticated = action.payload?.success || false;
        state.userProfile = action.payload?.responseData;
      })
      .addCase(signupUserThunk.rejected, (state, action) => {
        state.buttonLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload || "Failed to signup";
      });

    //logout user
    builder
      .addCase(logoutUserThunk.pending, (state) => {
        state.buttonLoading = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.screenLoading = false;
        state.buttonLoading = false;
        state.userProfile = null;
        state.error = null;
        localStorage.clear();
        state.selectedUser = null;
      })
      .addCase(logoutUserThunk.rejected, (state) => {
        state.buttonLoading = false;
      });

    //get user profile
    builder
      .addCase(getProfileUserThunk.pending, (state) => {
        state.screenLoading = true;
      })
      .addCase(getProfileUserThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.screenLoading = false;
        state.userProfile = action.payload?.responseData;
      })
      .addCase(getProfileUserThunk.rejected, (state) => {
        state.screenLoading = false;
      });

    //get other user profile
    builder
      .addCase(getOtherUserThunk.pending, (state) => {
        state.screenLoading = true;
      })
      .addCase(getOtherUserThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.screenLoading = false;
        state.otherUserProfile = action.payload?.responseData;
      })
      .addCase(getOtherUserThunk.rejected, (state) => {
        state.screenLoading = false;
      });
  },
});

export const { setSelectedUser } = userSlice.actions;

export default userSlice.reducer;
