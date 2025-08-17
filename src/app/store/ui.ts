import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navExpanded: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleNav: (state) => {
      state.navExpanded = !state.navExpanded;
    },
    setNavExpanded: (state, action) => {
      state.navExpanded = action.payload;
    },
  },
});

export const { toggleNav, setNavExpanded } = uiSlice.actions;
export default uiSlice.reducer;
