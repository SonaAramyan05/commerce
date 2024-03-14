import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
type signinState = {
    isSignedIn: boolean;
};
const initialState: signinState = {
    isSignedIn: false,
};
export const signinUser = createAsyncThunk(
    "signin/signinUser",
    async (
        { email, password }: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch("http://localhost:8000/users");
            const users = await response.json();
            const validUser = users.find(
                (user: { email: string; password: string }) =>
                    user.email === email && user.password === password
            );
            if (validUser) {
                return validUser;
            } else {
                return rejectWithValue("Invalid email or password");
            }
        } catch (error) {
            return rejectWithValue("Error !!!");
        }
    }
);

const signinSlice = createSlice({
    name: "signin",
    initialState,
    reducers: {
        logout: (state) => {
            state.isSignedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signinUser.fulfilled, (state) => {
            state.isSignedIn = true;
        });
    },
});

export const { logout } = signinSlice.actions;
export default signinSlice.reducer;
