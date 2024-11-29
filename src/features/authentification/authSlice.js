import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: null,
    isAuthenticated: false,
    role: null,
  },
  isAuthPopupVisible: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.user.isAuthenticated = action.payload;
    },
    setCredentials: (state, action) => {
      state.user.username = action.payload.user.username;
      state.user.role = action.payload.user.role;
      state.user.isAuthenticated = action.payload.isAuthenticated;
    },
    unsetCredentials: (state, action) => {
      state.user = {
        username: null,
        isAuthenticated: false,
        role: null,
      };
    },
    setAuthPopup(state) {
      state.isAuthPopupVisible = true;
    },
    unsetAuthPopup(state) {
      state.isAuthPopupVisible = false;
    },
  },
});
export const {
  setAuthStatus,
  setCredentials,
  unsetCredentials,
  setAuthPopup,
  unsetAuthPopup,
} = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user.username;
export const selectIsAuthenticated = (state) => state.auth.user.isAuthenticated;
