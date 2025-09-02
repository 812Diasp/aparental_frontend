// app/components/navbar/Navbar.jsx
'use client';

import { FaUser, FaHeart, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { GiWoodFrame } from 'react-icons/gi';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // ✅ Блокировка скролла при открытом меню
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [mobileMenuOpen]);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/pages/explore', label: 'Explore' },
        { href: '/pages/favorites', label: 'Favorites' },
    ];

    const isActive = (path) => pathname === path;

    const handleLogout = () => {
        dispatch(logout());
        setMobileMenuOpen(false);
    };

    return (
        <motion.nav
            className="bg-white shadow-sm border-b border-eco-light sticky top-0 z-50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Логотип */}
                    <Link href={'/'}>
                        <motion.div
                            className="flex items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <GiWoodFrame className="h-8 w-8 text-eco-primary" />
                            <span className="ml-2 text-xl font-cursive text-eco-dark font-bold">EcoStay</span>
                        </motion.div>
                    </Link>

                    {/* Десктоп ссылки */}
                    <div className="hidden sm:flex sm:space-x-8">
                        {navLinks.map((link) => (
                            <Link href={link.href} key={link.href}>
                                <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                                    <span
                                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                                            isActive(link.href)
                                                ? 'text-eco-dark font-semibold'
                                                : 'text-eco-medium hover:text-eco-dark'
                                        }`}
                                    >
                                        {link.label}
                                    </span>
                                    {isActive(link.href) && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-eco-primary"
                                            layoutId="activeIndicator"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    {/* Десктоп кнопки справа */}
                    <div className="hidden sm:flex sm:items-center space-x-2">
                        <motion.button
                            className="p-2 rounded-full text-eco-medium hover:text-eco-dark focus:outline-none"
                            whileHover={{ scale: 1.1, backgroundColor: '#f5f5f5' }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaSearch className="h-5 w-5" />
                        </motion.button>

                        <Link href="/pages/favorites">
                            <motion.button
                                className="p-2 rounded-full text-eco-medium hover:text-eco-dark focus:outline-none"
                                whileHover={{ scale: 1.1, backgroundColor: '#f5f5f5' }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaHeart className="h-5 w-5" />
                            </motion.button>
                        </Link>

                        {token ? (
                            <div className="flex items-center space-x-2">
                                <Link href="/pages/profile">
                                    <motion.button
                                        className="flex items-center p-2 rounded-full text-eco-medium hover:text-eco-dark focus:outline-none"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaUser className="h-5 w-5" />
                                        <span className="ml-1 text-sm">Profile</span>
                                    </motion.button>
                                </Link>
                                <motion.button
                                    onClick={handleLogout}
                                    className="text-sm text-gray-600 hover:text-red-500 transition"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Logout
                                </motion.button>
                            </div>
                        ) : (
                            <Link href="/pages/login">
                                <motion.button
                                    className="px-4 py-2 rounded-lg bg-eco-primary text-white text-sm font-medium hover:bg-eco-primary/90 transition"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Login
                                </motion.button>
                            </Link>
                        )}
                    </div>

                    {/* Мобильная кнопка бургера */}
                    <div className="sm:hidden">
                        <motion.button
                            onClick={() => setMobileMenuOpen(true)}
                            className="p-2 rounded-md text-eco-medium hover:text-eco-dark focus:outline-none"
                            whileTap={{ scale: 0.9 }}
                            aria-label="Open menu"
                        >
                            <FaBars className="h-6 w-6" />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* === Мобильное меню — модальное, поверх контента === */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex"
                        onClick={() => setMobileMenuOpen(false)} // закрытие по клику на фон
                    >
                        {/* Фон затемнения */}
                        <motion.div
                            className="absolute inset-0 bg-black bg-opacity-50"
                            onClick={(e) => e.stopPropagation()} // предотвращает закрытие при клике внутри меню
                        />

                        {/* Сайдбар меню */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="relative w-64 bg-white h-full shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Кнопка закрытия */}
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none z-10"
                                aria-label="Close menu"
                            >
                                <FaTimes className="h-6 w-6" />
                            </button>

                            {/* Логотип внутри меню */}
                            <div className="p-6 pt-12">
                                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                                    <div className="flex items-center">
                                        <GiWoodFrame className="h-8 w-8 text-eco-primary" />
                                        <span className="ml-2 text-xl font-cursive text-eco-dark font-bold">EcoStay</span>
                                    </div>
                                </Link>
                            </div>

                            {/* Ссылки */}
                            <div className="px-6 py-4 space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        href={link.href}
                                        key={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <div
                                            className={`block px-3 py-2 rounded-md text-base font-medium ${
                                                isActive(link.href)
                                                    ? 'bg-eco-light text-eco-dark font-semibold'
                                                    : 'text-eco-medium hover:bg-eco-light hover:text-eco-dark'
                                            }`}
                                        >
                                            {link.label}
                                        </div>
                                    </Link>
                                ))}

                                {token ? (
                                    <>
                                        <Link
                                            href="/pages/profile"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <div className="flex items-center px-3 py-2 rounded-md text-base font-medium text-eco-dark hover:bg-eco-light">
                                                <FaUser className="mr-2" /> Profile
                                            </div>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50 transition"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        href="/pages/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <div className="px-3 py-2 rounded-md text-base font-medium text-eco-primary hover:bg-eco-light">
                                            Login
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}