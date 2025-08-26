'use client';

import { FaUser, FaHeart, FaSearch, FaBars } from 'react-icons/fa';
import { GiWoodFrame } from 'react-icons/gi';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useState } from "react";
import LoginButton from "@/app/components/loginButton/loginButton";

export default function Navbar() {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const isLoggedIn = Boolean(token || (typeof window !== "undefined" && localStorage.getItem("token")));

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/pages/explore', label: 'Explore' },
        { href: '/pages/favorites', label: 'Favorites' },
    ];

    const isActive = (path) => pathname === path;

    const handleLogout = () => {
        dispatch(logout());
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
                                    <span className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                                        isActive(link.href) ? 'text-eco-dark font-semibold' : 'text-eco-medium hover:text-eco-dark'
                                    }`}>
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
                        <motion.button className="p-2 rounded-full text-eco-medium hover:text-eco-dark focus:outline-none"
                                       whileHover={{ scale: 1.1, backgroundColor: '#f5f5f5' }} whileTap={{ scale: 0.9 }}>
                            <FaSearch className="h-5 w-5" />
                        </motion.button>

                        <Link href="/pages/favorites">
                            <motion.button className="p-2 rounded-full text-eco-medium hover:text-eco-dark focus:outline-none"
                                           whileHover={{ scale: 1.1, backgroundColor: '#f5f5f5' }} whileTap={{ scale: 0.9 }}>
                                <FaHeart className="h-5 w-5" />
                            </motion.button>
                        </Link>

                        {isLoggedIn ? (
                            <Link href="/pages/profile">
                                <motion.button
                                    className="p-2 rounded-full text-eco-medium hover:text-eco-dark focus:outline-none"
                                    whileHover={{ scale: 1.1, backgroundColor: '#f5f5f5' }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaUser className="h-5 w-5" />
                                    <span className="ml-1 text-sm">Profile</span>
                                </motion.button>
                            </Link>
                        ) : (
                            <Link href="/pages/login">
                                <LoginButton />
                            </Link>
                        )}
                    </div>

                    {/* Мобильное меню (бургер) */}
                    <div className="sm:hidden flex items-center">
                        <motion.button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-md text-eco-medium hover:text-eco-dark focus:outline-none"
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaBars className="h-6 w-6" />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Выпадающее меню для мобилок */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="sm:hidden bg-white border-t border-gray-200"
                    >
                        <div className="px-4 pt-2 pb-3 space-y-1">
                            {navLinks.map((link) => (
                                <Link href={link.href} key={link.href} onClick={() => setMobileMenuOpen(false)}>
                                    <div className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        isActive(link.href) ? 'bg-eco-light text-eco-dark' : 'text-eco-medium hover:bg-eco-light hover:text-eco-dark'
                                    }`}>
                                        {link.label}
                                    </div>
                                </Link>
                            ))}

                            {/* Кнопка входа/профиля */}
                            {isLoggedIn ? (
                                <Link href="/pages/profile" onClick={() => setMobileMenuOpen(false)}>
                                    <div className="flex items-center px-3 py-2 rounded-md text-base font-medium text-eco-dark hover:bg-eco-light">
                                        <FaUser className="mr-2" /> Profile
                                    </div>
                                </Link>
                            ) : (
                                <Link href="/pages/login" onClick={() => setMobileMenuOpen(false)}>
                                    <LoginButton mobile />
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
