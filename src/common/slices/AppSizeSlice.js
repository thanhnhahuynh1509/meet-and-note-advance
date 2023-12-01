import { createSlice } from "@reduxjs/toolkit";

const appSizeSlice = createSlice({
  name: "appSize",
  initialState: {
    headerHeight: 0,
    toolbarWidth: 0,
  },

  reducers: {
    initAppSize: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { initAppSize } = appSizeSlice.actions;
export const appSizeState = (state) => state.appSize;

export default appSizeSlice.reducer;
