import { createSelector } from "@reduxjs/toolkit";
import { rootState } from "..";

export const cartSelector = (state: rootState) => state.cart;
export const CartItemsSelector = createSelector(
    cartSelector,
    (cart) => cart.items
);
