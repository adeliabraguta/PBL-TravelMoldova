import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const authPersistConfig = {
    key: "auth",
    storage,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, access_token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { user, access_token } = action.payload
            state.user = user
            state.access_token = access_token
        },
        unsetCredentials: (state, action) => {
            state.user = { name: null }
            state.access_token = null
        },
    }
})
export const { setCredentials, unsetCredentials } = authSlice.actions;

const persistedAuthSlice = persistReducer(authPersistConfig, authSlice.reducer);

export default persistedAuthSlice;

export const selectCurrentUser = (state) => state.auth.user;

export const selectCurrentToken = (state) => state.auth.access_token;
