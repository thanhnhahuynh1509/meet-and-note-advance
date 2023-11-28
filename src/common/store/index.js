import { configureStore } from "@reduxjs/toolkit";
import workspaceSlice from "../slices/workspaceSlice";
import AppSizeSlice from "../slices/AppSizeSlice";

export const store = configureStore({
  reducer: {
    workspace: workspaceSlice,
    appSize: AppSizeSlice,
  },
});

export * from "../slices/workspaceSlice";
export * from "../slices/AppSizeSlice";
