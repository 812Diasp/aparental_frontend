// app/pages/profile/page.jsx
'use client';

import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchMe } from '@/app/store/slices/userSlice';
import { logout } from '@/app/store/slices/authSlice';
import { fetchUserBookings } from '@/app/store/slices/bookingSlice';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.user);
    const { bookings, loading: bookingsLoading } = useSelector((state) => state.booking);
    const { token } = useSelector((state) => state.auth);
    const [isClient, setIsClient] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        setIsClient(true);
        if (token) {
            dispatch(fetchMe());
            dispatch(fetchUserBookings());
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

    // Функция для получения статуса бронирования
    const getStatusBadge = (status) => {
        const statusConfig = {
            CREATED: { color: 'bg-blue-100 text-blue-800', text: 'Created' },
            CONFIRMED: { color: 'bg-green-100 text-green-800', text: 'Confirmed' },
            COMPLETED: { color: 'bg-gray-100 text-gray-800', text: 'Completed' },
            CANCELLED: { color: 'bg-red-100 text-red-800', text: 'Cancelled' }
        };

        const config = statusConfig[status] || statusConfig.CREATED;
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    // Безопасное получение данных
    const bookingsCount = Array.isArray(bookings) ? bookings.length : 0;
    const hasBookings = Array.isArray(bookings) && bookings.length > 0;
    const safeBookings = Array.isArray(bookings) ? bookings : [];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-eco-dark">My Profile</h1>
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-4 py-2 rounded-lg bg-eco-primary text-white text-sm font-medium hover:bg-eco-primary/90 transition"
                            >
                                Back to Home
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === 'profile'
                                        ? 'border-eco-primary text-eco-primary'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Profile Information
                            </button>
                            <button
                                onClick={() => setActiveTab('bookings')}
                                className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === 'bookings'
                                        ? 'border-eco-primary text-eco-primary'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                My Bookings ({bookingsCount})
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'profile' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg shadow-sm p-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <p className="text-gray-900 bg-gray-50 rounded-lg px-4 py-3">{data?.fullName || '—'}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <p className="text-gray-900 bg-gray-50 rounded-lg px-4 py-3">{data?.email || '—'}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                <p className="text-gray-900 bg-gray-50 rounded-lg px-4 py-3">{data?.city || '—'}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                <p className="text-gray-900 bg-gray-50 rounded-lg px-4 py-3">{data?.country || '—'}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                <p className="text-gray-900 bg-gray-50 rounded-lg px-4 py-3 capitalize">{data?.role || 'user'}</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <motion.button
                                onClick={() => dispatch(logout())}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
                            >
                                Logout
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'bookings' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg shadow-sm p-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">My Bookings</h2>

                        {bookingsLoading ? (
                            <div className="flex justify-center py-12">
                                <div className="w-8 h-8 border-4 border-eco-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : !hasBookings ? (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2M8 7v4m8-4v4" />
                                    </svg>
                                </div>
                                <p className="text-gray-500 text-lg mb-4">No bookings yet</p>
                                <Link href="/">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-2 bg-eco-primary text-white rounded-lg font-medium hover:bg-eco-primary/90 transition"
                                    >
                                        Explore Properties
                                    </motion.button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {safeBookings.map((booking) => (
                                    <motion.div
                                        key={booking.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-semibold text-gray-900">
                                                {booking.property?.title || 'Unknown Property'}
                                            </h3>
                                            {getStatusBadge(booking.status)}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-600">Dates:</span>
                                                <p className="text-gray-900">
                                                    {booking.startDate ? format(parseISO(booking.startDate), 'MMM dd, yyyy') : 'N/A'} - {booking.endDate ? format(parseISO(booking.endDate), 'MMM dd, yyyy') : 'N/A'}
                                                </p>
                                            </div>

                                            <div>
                                                <span className="text-gray-600">Nights:</span>
                                                <p className="text-gray-900">
                                                    {booking.startDate && booking.endDate
                                                        ? Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24))
                                                        : 'N/A'
                                                    }
                                                </p>
                                            </div>

                                            <div>
                                                <span className="text-gray-600">Total Price:</span>
                                                <p className="text-green-600 font-semibold">
                                                    ${booking.totalPrice ? booking.totalPrice.toFixed(2) : '0.00'}
                                                </p>
                                            </div>
                                        </div>

                                        {booking.property?.location && (
                                            <div className="mt-3 pt-3 border-t border-gray-100">
                                                <span className="text-gray-600">Location:</span>
                                                <p className="text-gray-900">{booking.property.location}</p>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}