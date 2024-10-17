import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  username: null,
  isAuthenticated: null,
  role: null,
  isAuthPopupVisible: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setCredentials: (state, action) => {
      state.username = action.payload.user.username;
      state.role = action.payload.user.role;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    setUserName: (state, action) => {
      const { username } = action.payload;
      state.username = username;
    },
    unsetCredentials: (state, action) => {
      state.user = { name: null };
      state.isAuthenticated = null;
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
  setUserName,
  setAuthPopup,
  unsetAuthPopup,
} = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.username;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
