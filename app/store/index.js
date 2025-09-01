// app/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import favoritesReducer from './slices/favoritesSlice';
export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            user: userReducer,
            favorites: favoritesReducer,
        },
    });
};

// Типы для TypeScript (если используется)
export const store = makeStore();
