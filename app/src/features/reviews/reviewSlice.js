import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  body: null,
  rating: null,
  title: null,
};
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setComment: (state, action) => {
      const { body, rating, title } = action.payload;
      state.body = body;
      state.rating = rating;
      state.title = title;
    },
  },
});
export const { setComment } = reviewSlice.actions;
export default reviewSlice.reducer;
export const selectCurrentBody = (state) => state.review.body;
export const selectCurrentRating = (state) => state.review.rating;
export const selectCurrentTitle = (state) => state.review.title;
