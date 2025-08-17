import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui";
import authReducer from "./auth";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
