import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui";
import authReducer from "./auth";
import users from "./users";
import products from "./products";
import challan from "./challan";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    [users.reducerPath]: users.reducer,
    [products.reducerPath]: products.reducer,
    [challan.reducerPath]: challan.reducer,
  },
  middleware: (get) =>
    get().concat(users.middleware, products.middleware, challan.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
