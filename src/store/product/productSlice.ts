import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Item } from "../../types";
import { v4 as uuidv4 } from "uuid";

export const addItem = createAsyncThunk(
    "product/addItem",
    async (formData: Item) => {
        const newItem = { ...formData, id: uuidv4() };
        await axios.post("http://localhost:8000/items", newItem);
        return formData;
    }
);

export const getItems = createAsyncThunk("product/getItems", async () => {
    const response = await axios.get("http://localhost:8000/items");
    return response.data;
});

interface ProductState {
    items: Item[];
}

const initialState: ProductState = {
    items: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addItem.fulfilled, (state, action) => {
            state.items.push(action.payload);
        });
        builder.addCase(getItems.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
});

export default productSlice.reducer;
