import { combineReducers } from "redux";
import authSlice from "../features/authentification/authSlice.js";
import { api } from "./services/apiService.js";
import { authApi } from "./services/authService.js";
import { storiesApi } from "./services/apiStories.js";
import favouriteSlice from "../components/UI/favSlice.js";
import searchSlice from "../features/searchDestination/searchSlice.js";

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [storiesApi.reducerPath]: storiesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  auth: authSlice,
  search: searchSlice,
  fav: favouriteSlice,
});
