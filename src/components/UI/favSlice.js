import { createSlice } from "@reduxjs/toolkit";
import { getSliderUtilityClass } from "@mui/material";

const initialState = {
  favouriteList: localStorage.getItem("favouriteDestinations")
    ? JSON.parse(localStorage.getItem("favouriteDestinations"))
    : [],
};

const favouriteSlice = createSlice({
  name: "favouriteSlice",
  initialState,
  reducers: {
    setFavourite: (state, action) => {
      const destinationIndex = state.favouriteList.findIndex(
        (item) => item.slug === action.payload.slug,
      );
      if (destinationIndex !== -1) {
        state.favouriteList = state.favouriteList.filter(
          (item) => item.slug !== action.payload.slug,
        );
      } else {
        state.favouriteList.push(action.payload);
      }
      localStorage.setItem(
        "favouriteDestinations",
        JSON.stringify(state.favouriteList),
      );
    },
  },
});

export const { setFavourite } = favouriteSlice.actions;

export default favouriteSlice.reducer;
