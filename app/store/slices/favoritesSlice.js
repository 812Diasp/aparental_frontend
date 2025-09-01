// app/store/slices/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: [], // массив id избранных объектов
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const propertyId = action.payload;
            const index = state.items.indexOf(propertyId);
            if (index === -1) {
                state.items.push(propertyId);
            } else {
                state.items.splice(index, 1);
            }
            // Сохраняем в localStorage для персистентности
            if (typeof window !== 'undefined') {
                localStorage.setItem('favorites', JSON.stringify(state.items));
            }
        },
        loadFavorites: (state) => {
            if (typeof window !== 'undefined') {
                const saved = localStorage.getItem('favorites');
                if (saved) {
                    state.items = JSON.parse(saved);
                }
            }
        },
        removeFromFavorites: (state, action) => {
            const propertyId = action.payload;
            state.items = state.items.filter(id => id !== propertyId);
            if (typeof window !== 'undefined') {
                localStorage.setItem('favorites', JSON.stringify(state.items));
            }
        },
        clearFavorites: (state) => {
            state.items = [];
            if (typeof window !== 'undefined') {
                localStorage.removeItem('favorites');
            }
        }
    }
});

export const { toggleFavorite, loadFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;