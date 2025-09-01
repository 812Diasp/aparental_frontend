// app/layout.js или Providers
'use client';

import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { loadToken } from '../store/slices/authSlice';

export default function AuthInitializer() {
    const store = useStore();

    useEffect(() => {
        store.dispatch(loadToken());
    }, [store]);

    return null;
}