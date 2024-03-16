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
    async ({ item, quantity }: { item: Item; quantity: number }) => {
        try {
            // const updatedItem = { ...item, count: item.count - 1 };
            await axios.put(`http://localhost:8000/items/${item.id}`, item);
            return { item, quantity };
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
                const { item, quantity } = action.payload;

                const existingItem = state.items.find(
                    (item) => item.id === action.payload.item.id
                );
                if (existingItem) {
                    existingItem.count += quantity;
                } else {
                    const newItem = { ...item, count: quantity };
                    state.items.push(newItem);
                }
            }
        );
    },
});
export const { updateItemCount, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
