import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = "http://localhost:8080";

export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
    try {
        const res = await axios.post(`${API}/api/auth/login`, credentials);
        localStorage.setItem("token", res.data.token);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || "Ошибка входа");
    }
});

export const register = createAsyncThunk("auth/register", async (data, thunkAPI) => {
    try {
        const res = await axios.post(`${API}/api/auth/register`, data);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || "Ошибка регистрации");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: { userId: null, token: null, role: null, loading: false, error: null },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.userId = null;
            state.token = null;
            state.role = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => { state.loading = true; })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.userId = action.payload.userId;
                state.role = action.payload.role;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.userId = action.payload.userId;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
