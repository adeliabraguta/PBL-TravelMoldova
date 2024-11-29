import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFilterPopupVisible: false,
  search: null,
  rating: null,
  type: null,
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setFilterPopup(state, action) {
      state.isFilterPopupVisible = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setFilter(state, action) {
      const { rating, type } = action.payload;
      state.rating = rating;
      state.type = type;
    },
  },
});
export const { setFilterPopup, setSearch, setFilter } = searchSlice.actions;

export default searchSlice.reducer;

export const selectIsFilterPopupVisible = (state) =>
  state.search.isFilterPopupVisible;
export const selectSearchState = (state) => ({
  search: state.search.search,
  rating: state.search.rating,
  type: state.search.type,
});
