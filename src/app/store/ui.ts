import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navExpanded: false,
  currentTab: "Stock Dashboard",
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
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { toggleNav, setNavExpanded, setCurrentTab } = uiSlice.actions;
export default uiSlice.reducer;
