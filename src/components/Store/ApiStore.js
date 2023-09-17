import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {api} from "../Store/ApiData.js";
export const store= configureStore({
    reducer: {
        [api.reducerPath] : api.reducer,
        // [apiDestination.reducerPath]: apiDestination.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat( api.middleware),

})
setupListeners(store.dispatch)