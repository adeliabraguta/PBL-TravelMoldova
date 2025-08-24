// favSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favouriteList: localStorage.getItem("favouriteDestinations")
      ? JSON.parse(localStorage.getItem("favouriteDestinations"))
      : [],
};

const favouriteSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    setFavourite: (state, action) => {
      const destinationIndex = state.favouriteList.findIndex(
          (item) => item._id === action.payload._id
      );
      if (destinationIndex !== -1) {
        state.favouriteList = state.favouriteList.filter(
            (item) => item._id !== action.payload._id
        );
      } else {
        state.favouriteList.push(action.payload);
      }
      localStorage.setItem(
          "favouriteDestinations",
          JSON.stringify(state.favouriteList)
      );
    },
  },
});

export const { setFavourite } = favouriteSlice.actions;
export const selectFavoriteDestinations = (state) => state.fav.favouriteList;
export default favouriteSlice.reducer;
