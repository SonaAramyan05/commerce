import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

type userState = {
    currentUser: User | null;
    isLoading: boolean;
};

const initialState: userState = {
    currentUser: null,
    isLoading: false,
};

export const updateUserInDB = createAsyncThunk<
    User,
    User,
    {
        rejectValue: string;
    }
>("user/updateUserInDB", async (user: User, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:8000/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("Failed to update user");
        }
        return user;
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateUserInDB.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateUserInDB.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
        });
        builder.addCase(updateUserInDB.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
