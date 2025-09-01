// app/pages/profile/page.jsx
'use client';

import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchMe } from '@/app/store/slices/userSlice';
import { logout } from '@/app/store/slices/authSlice';
import Link from 'next/link';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.user);
    const { token } = useSelector((state) => state.auth);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (token) {
            dispatch(fetchMe());
        }
    }, [dispatch, token]);

    if (!isClient) return null;

    // 🔐 Not logged in
    if (!token) {
        return (
            <div className="min-h-screen flex">
                {/* Левая часть — картинка */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-br from-eco-primary/90 to-eco-dark"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-70"
                        style={{
                            backgroundImage: "url('/1547220657_original_12341_oboi_zelenye_gory_1920x1080.webp')",
                        }}
                    ></div>
                    <motion.div
                        className="absolute text-white text-center p-6 z-10"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Access Required</h1>
                        <p className="text-lg opacity-90">Please log in to view your profile.</p>
                    </motion.div>
                </motion.div>

                {/* Правая часть — форма ошибки */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex w-full lg:w-1/2 items-center justify-center bg-white"
                >
                    <div className="max-w-md w-full p-8 space-y-6">
                        <h2 className="text-3xl font-bold text-center text-eco-dark">Profile</h2>

                        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center space-y-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-red-500 mx-auto"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4"
                                />
                            </svg>
                            <p className="text-gray-700">You must be logged in to view your profile.</p>
                            <Link href="/pages/login">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-3 rounded-xl bg-eco-primary text-white font-semibold shadow-md hover:bg-eco-primary/90 transition"
                                >
                                    Go to Login
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    // ⏳ Loading
    if (loading) {
        return (
            <div className="min-h-screen flex">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-br from-eco-primary/90 to-eco-dark"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-70"
                        style={{
                            backgroundImage: "url('/1547220657_original_12341_oboi_zelenye_gory_1920x1080.webp')",
                        }}
                    ></div>
                    <motion.div
                        className="absolute text-white text-center p-6 z-10"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Loading Profile</h1>
                        <p className="text-lg opacity-90">We're fetching your data...</p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex w-full lg:w-1/2 items-center justify-center bg-white"
                >
                    <div className="max-w-md w-full p-8 space-y-6">
                        <h2 className="text-3xl font-bold text-center text-eco-dark">Profile</h2>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-12 h-12 border-4 border-eco-primary border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-600">Loading your information...</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    // ❌ Error
    if (error) {
        return (
            <div className="min-h-screen flex">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-br from-eco-primary/90 to-eco-dark"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-70"
                        style={{
                            backgroundImage: "url('/1547220657_original_12341_oboi_zelenye_gory_1920x1080.webp')",
                        }}
                    ></div>
                    <motion.div
                        className="absolute text-white text-center p-6 z-10"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Error</h1>
                        <p className="text-lg opacity-90">Something went wrong.</p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex w-full lg:w-1/2 items-center justify-center bg-white"
                >
                    <div className="max-w-md w-full p-8 space-y-6">
                        <h2 className="text-3xl font-bold text-center text-eco-dark">Profile</h2>

                        <div className="bg-red-50 border border-red-200 rounded-xl p-6 space-y-4">
                            <div className="flex items-center space-x-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <p className="font-medium text-gray-700">Failed to load profile</p>
                            </div>
                            <p className="text-sm text-gray-600">{error.message || 'Unknown error occurred.'}</p>
                            <Link href="/pages/login">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-3 rounded-xl bg-eco-primary text-white font-semibold shadow-md hover:bg-eco-primary/90 transition"
                                >
                                    Return to Login
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    // ✅ Success: Show Profile + Logout Button
    return (
        <div className="min-h-screen flex">
            {/* Левая часть — картинка */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-br from-eco-primary/90 to-eco-dark"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{
                        backgroundImage: "url('https://i.pinimg.com/originals/06/31/0f/06310f2a5b6ed57f8f7d47df16d0bb3b.jpg')",
                    }}
                ></div>
                <motion.div
                    className="absolute text-white text-center p-6 z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">My Profile</h1>
                    <p className="text-lg opacity-90">Your eco-friendly journey starts here.</p>
                </motion.div>
            </motion.div>

            {/* Правая часть — данные профиля */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex w-full lg:w-1/2 items-center justify-center bg-white"
            >
                <div className="max-w-md w-full p-8 space-y-6">
                    <h2 className="text-3xl font-bold text-center text-eco-dark">Profile Info</h2>

                    {data ? (
                        <div className="space-y-4 bg-eco-lighter/60 border border-eco-light/30 rounded-xl p-6 text-gray-800">
                            <div className="space-y-3">
                                <p><strong>Full Name:</strong> {data.fullName || '—'}</p>
                                <p><strong>Email:</strong> {data.email || '—'}</p>
                                <p><strong>City:</strong> {data.city || '—'}</p>
                                <p><strong>Country:</strong> {data.country || '—'}</p>
                                <p><strong>Role:</strong> <span className="capitalize">{data.role || 'user'}</span></p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 italic">No data available.</p>
                    )}

                    {/* Кнопки */}
                    <div className="space-y-3">
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-2 rounded-lg bg-eco-secondary text-white text-sm font-medium hover:bg-eco-secondary/90 transition"
                            >
                                Back to Home
                            </motion.button>
                        </Link>

                        {/* Logout Button */}
                        <motion.button
                            onClick={() => dispatch(logout())}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                        >
                            Logout
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}