import { combineReducers } from "redux";
import authSlice from "../features/authentification/authSlice.js";
import { api } from "./services/apiService.js";
import {storiesApi} from "./services/apiStories.js";
import favouriteSlice from "../components/UI/favSlice.js";


export const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    [storiesApi.reducerPath] : storiesApi.reducer,
    auth: authSlice,
    fav: favouriteSlice
});