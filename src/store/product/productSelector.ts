import { createSelector } from "@reduxjs/toolkit";
import { rootState } from "..";

export const productsSelector = (state: rootState) => state.products;
export const itemsSelector = createSelector(
    productsSelector,
    (product) => product.items
);
export const productCountSelector = createSelector(
    itemsSelector,
    (items) =>
        items.map((item) => ({
            id: item.id,
            count: item.count,
        }))
);