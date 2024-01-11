import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage,
};
const initialState = {
  user: null,
  access_token: null,
  username: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, access_token } = action.payload;
      state.user = user;
      state.access_token = access_token;
    },
    setUserName: (state, action) => {
      const { username } = action.payload;
      state.username = username;
    },
    unsetCredentials: (state, action) => {
      state.user = { name: null };
      state.access_token = null;
    },
  },
});
export const { setCredentials, unsetCredentials, setUserName } =
  authSlice.actions;
const persistedAuthSlice = persistReducer(authPersistConfig, authSlice.reducer);
export default persistedAuthSlice;
export const selectCurrentUser = (state) => state.auth.username;
export const selectCurrentToken = (state) => state.auth.access_token;

