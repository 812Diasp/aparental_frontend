// app/store/slices/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: [], // массив id
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
            saveToStorage(state.items);
        },
        loadFavorites: (state) => {
            const saved = loadFromStorage();
            state.items = saved || [];
        },
        removeFromFavorites: (state, action) => {
            const propertyId = action.payload;
            state.items = state.items.filter(id => id !== propertyId);
            saveToStorage(state.items);
        },
        clearFavorites: (state) => {
            state.items = [];
            saveToStorage([]);
        },
    },
});

// Вспомогательные функции
const saveToStorage = (favorites) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
};

const loadFromStorage = () => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    }
    return [];
};

export const { toggleFavorite, loadFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;