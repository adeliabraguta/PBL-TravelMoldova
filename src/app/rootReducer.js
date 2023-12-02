import { combineReducers } from "redux";
import authSlice from "../features/authentification/authSlice.js";
import { api } from "./services/apiService.js";


export const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authSlice,
});