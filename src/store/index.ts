import { configureStore } from "@reduxjs/toolkit";
import signInReducer from "./signIn/signInSlice";
import userReducer from "./user/userSlice";
import productReducer from "./product/productSlice";
import cartReducer from "./cart/cartSlice";
import orderReducer from "./order/orderSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        signIn: signInReducer,
        currentUser: userReducer,
        products: productReducer,
        cart: cartReducer,
        order: orderReducer
    },
});
export type rootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
