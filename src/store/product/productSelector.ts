import { createSelector } from "@reduxjs/toolkit";
import { rootState } from "..";

export const productsSelector = (state: rootState) => state.products;
export const itemsSelector = createSelector(
    productsSelector,
    (product) => product.items
);
