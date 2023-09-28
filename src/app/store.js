import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./services/apiService.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./rootReducer.js";

// Create a persist configuration
const persistConfig = {
    key: "root", // Change this key if you have multiple persist configurations
    storage,
    whitelist: ["auth"], // Add the reducers you want to persist here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch)