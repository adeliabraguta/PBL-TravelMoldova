import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import { api } from "./ApiData.js"; // Use relative path


export const store= configureStore({
    reducer: {
        [api.reducerPath] : api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
})
setupListeners(store.dispatch)