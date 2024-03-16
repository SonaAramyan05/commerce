import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Item } from "../../types";
import { v4 } from "uuid";

interface Order {
    id: string;
    date: string;
    items: Item[];
}

interface OrderState {
    orders: Order[];
}

const initialState: OrderState = {
    orders: [],
};

export const addOrder = createAsyncThunk(
    "orders/addOrder",
    async (items: Item[]) => {
        const order: Order = {
            id: v4(),
            date: new Date().toISOString(),
            items,
        };
        await axios.post("http://localhost:8000/orders", order);
        return order;
    }
);

export const getOrders = createAsyncThunk("orders/getOrders", async () => {
    try {
        const response = await axios.get("http://localhost:8000/orders");
        return response.data;
    } catch (error) {
        throw error;
    }
});

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addOrder.fulfilled, (state, action) => {
            state.orders.push(action.payload);
        });
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
        });
    },
});

export default orderSlice.reducer;
