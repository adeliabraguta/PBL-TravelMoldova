import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./services/apiService.js";
import authSlice from "../features/authentification/authSlice.js";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)