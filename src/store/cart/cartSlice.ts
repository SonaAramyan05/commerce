import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Item } from "../../types";

interface CartState {
    items: Item[];
}

const initialState: CartState = {
    items: [],
};

export const addToCartAndUpdateProductCount = createAsyncThunk(
    "cart/addToCartAndUpdateProductCount",
    async (item: Item) => {
        try {
            const updatedItem = { ...item, count: item.count - 1 };
            await axios.put(
                `http://localhost:8000/items/${item.id}`,
                updatedItem
            );
            return item;
        } catch (error) {
            throw error;
        }
    }
);

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateItemCount(
            state,
            action: PayloadAction<{ id: string; count: number }>
        ) {
            const { id, count } = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if (existingItem) {
                existingItem.count = count;
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            const itemId = action.payload;
            state.items = state.items.filter((item) => item.id !== itemId);
        },
        clearCart(state) {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            addToCartAndUpdateProductCount.fulfilled,
            (state, action) => {
                const existingItem = state.items.find(
                    (item) => item.id === action.payload.id
                );
                if (existingItem) {
                    existingItem.count++;
                } else {
                    const newItem = { ...action.payload, count: 1 };
                    state.items.push(newItem);
                }
            }
        );
    },
});
export const { updateItemCount, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
