import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui";
import authReducer from "./auth";
import users from "./users";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    [users.reducerPath]: users.reducer,
  },
  middleware: (get) => get().concat(users.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
