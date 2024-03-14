import { configureStore } from "@reduxjs/toolkit";
import signInReducer from "./signIn/signInSlice";
import userReducer from "./user/userSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        signIn: signInReducer,
        currentUser: userReducer
    },
});
export type rootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
