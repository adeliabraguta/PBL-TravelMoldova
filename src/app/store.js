import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../components/Store/ApiData.js";
import { apiAuth } from "./services/apiAuth.js";
import authSlice from "../features/authentification/authSlice.js";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        // [apiAuth.reducerPath]: apiAuth.reducer,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware, apiAuth.middleware),
})

setupListeners(store.dispatch)