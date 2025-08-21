import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui";
import authReducer from "./auth";
import users from "./users";
import challan from "./challan";
import productsApi from "./productsApi";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    [users.reducerPath]: users.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [challan.reducerPath]: challan.reducer,
  },
  middleware: (get) =>
    get().concat(users.middleware, productsApi.middleware, challan.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
