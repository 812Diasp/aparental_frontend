import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:8080";

export const fetchMe = createAsyncThunk("user/me", async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || "Ошибка загрузки профиля");
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: { data: null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMe.pending, (state) => { state.loading = true; })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchMe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default userSlice.reducer;
