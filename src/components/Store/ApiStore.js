import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {api} from "../Store/ApiData.js";
import {apiAuth} from "../Authentification/ApiAuth.js";

export const store= configureStore({
    reducer: {
        [api.reducerPath] : api.reducer,
        [apiAuth.reducerPath]: apiAuth.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat( api.middleware, apiAuth.reducer),

})
setupListeners(store.dispatch)