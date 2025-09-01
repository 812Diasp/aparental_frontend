// app/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:8080';

// === Async Thunks ===

// Вход
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const res = await axios.post(`${API}/api/auth/login`, credentials);
        const { token, userId, role } = res.data;

        // Сохраняем токен в localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        }

        return { token, userId, role };
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
    }
});

// Регистрация
export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
    try {
        const res = await axios.post(`${API}/api/auth/register`, data);
        const { token, userId, role } = res.data;

        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        }

        return { token, userId, role };
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
});

// === Slice ===
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: null,
        token: null,
        role: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
            }
            state.userId = null;
            state.token = null;
            state.role = null;
            state.error = null;
        },
        // Подтягиваем токен из localStorage при инициализации
        loadToken: (state) => {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('token');
                if (token) {
                    state.token = token;
                    // ⚠️ userId и role не восстанавливаются — они будут подгружены через fetchMe
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
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
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.userId = action.payload.userId;
                state.role = action.payload.role;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, loadToken } = authSlice.actions;
export default authSlice.reducer;