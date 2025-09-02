import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:8080';

// === Async Thunks ===

// Получить все свойства
export const fetchProperties = createAsyncThunk(
    'properties/fetchAll',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${API}/api/properties`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch properties');
        }
    }
);

// === Slice ===
const propertiesSlice = createSlice({
    name: 'properties',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        loadPropertiesFromCache: (state) => {
            if (typeof window !== 'undefined') {
                const saved = localStorage.getItem('properties');
                if (saved) {
                    state.items = JSON.parse(saved);
                }
            }
        },
        clearPropertiesCache: (state) => {
            state.items = [];
            if (typeof window !== 'undefined') {
                localStorage.removeItem('properties');
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProperties.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProperties.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;

                // Сохраняем в localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('properties', JSON.stringify(action.payload));
                }
            })
            .addCase(fetchProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { loadPropertiesFromCache, clearPropertiesCache } = propertiesSlice.actions;
export default propertiesSlice.reducer;
