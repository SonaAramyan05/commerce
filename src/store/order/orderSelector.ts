import { createSelector } from "@reduxjs/toolkit";
import { rootState } from "..";

export const ordersSelector = (state: rootState) => state.order;
export const orderListSelector = createSelector(
    ordersSelector,
    (order) => order.orders
);
