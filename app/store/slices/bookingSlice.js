// app/store/slices/bookingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:8080';

export const createBooking = createAsyncThunk(
    'booking/create',
    async ({ propertyId, startDate, endDate }, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.token;

            if (!token) {
                return thunkAPI.rejectWithValue('Требуется авторизация');
            }

            const response = await axios.post(
                `${API}/api/bookings`,
                { propertyId, startDate, endDate },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data;
        } catch (err) {
            const message = err.response?.data?.message ||
                err.response?.data ||
                `Ошибка бронирования: ${err.message}`;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchUserBookings = createAsyncThunk(
    'booking/fetchUserBookings',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.token;

            if (!token) {
                return thunkAPI.rejectWithValue('Требуется авторизация');
            }

            const response = await axios.get(
                `${API}/api/bookings/my`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            return response.data;
        } catch (err) {
            const message = err.response?.data?.message ||
                `Ошибка загрузки бронирований: ${err.message}`;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        current: null,
        bookings: [], // ИЗМЕНИЛИ: было userBookings, стало bookings
        loading: false,
        error: null,
    },
    reducers: {
        clearBooking: (state) => {
            state.current = null;
            state.error = null;
        },
        clearBookings: (state) => {
            state.bookings = []; // ИЗМЕНИЛИ
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload;
                state.bookings.push(action.payload); // ИЗМЕНИЛИ
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload; // ИЗМЕНИЛИ
            })
            .addCase(fetchUserBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearBooking, clearBookings } = bookingSlice.actions;
export default bookingSlice.reducer;