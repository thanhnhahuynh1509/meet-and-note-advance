import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,

  reducers: {
    setMe: (state, action) => {
      return {
        ...action?.payload,
      };
    },
  },
});

export const { setMe } = userSlice.actions;
export const userState = (state) => state.user;

export default userSlice.reducer;
