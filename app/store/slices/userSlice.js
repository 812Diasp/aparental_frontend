// app/store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:8080';

// Теперь токен берётся из Redux, а не из localStorage
export const fetchMe = createAsyncThunk('user/me', async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const token = state.auth.token; // ✅ Берём токен из Redux

        if (!token) {
            return thunkAPI.rejectWithValue('No token found');
        }

        const res = await axios.get(`${API}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || err.message || 'Failed to fetch profile';
        return thunkAPI.rejectWithValue({ message, status: err.response?.status });
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: { data: null, loading: false, error: null },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchMe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // теперь объект вида { message, status }
            });
    },
});

export default userSlice.reducer;