// app/Providers.jsx
'use client';

import { Provider } from 'react-redux';
import { store } from '../store/index';
import { useEffect } from 'react';
import { loadToken } from '../store/slices/authSlice';
import { loadFavorites } from '../store/slices/favoritesSlice'; // 👈

export function Providers({ children }) {
    return (
        <Provider store={store}>
            <AuthInitializer />
            {children}
        </Provider>
    );
}

function AuthInitializer() {
    const dispatch = store.dispatch;

    useEffect(() => {
        dispatch(loadToken());
        dispatch(loadFavorites()); // 👈 Загружаем избранное
    }, []);

    return null;
}