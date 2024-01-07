import { configureStore } from "@reduxjs/toolkit";
import workspaceSlice from "../slices/workspaceSlice";
import AppSizeSlice from "../slices/AppSizeSlice";
import userSlice from "../slices/userSlice";
import chatSlice from "../slices/chatSlice";

export const store = configureStore({
  reducer: {
    workspace: workspaceSlice,
    appSize: AppSizeSlice,
    user: userSlice,
    chat: chatSlice,
  },
});

export * from "../slices/workspaceSlice";
export * from "../slices/AppSizeSlice";
export * from "../slices/userSlice";
export * from "../slices/chatSlice";
