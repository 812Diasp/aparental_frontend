'use client';

import { useState, useEffect } from 'react';
import { FaUser, FaHeart, FaSearch } from 'react-icons/fa';
import { GiWoodCabin } from 'react-icons/gi';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/pages/explore', label: 'Explore' },
        { href: '/pages/favorites', label: 'Favorites' },
    ];

    const isActive = (path) => pathname === path;

    return (
        <motion.nav
            className={`bg-white shadow-sm border-b border-eco-light sticky top-0 z-50 ${
                scrolled ? 'shadow-md' : 'shadow-sm'
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <motion.div
                            className="flex-shrink-0 flex items-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <GiWoodCabin className="h-8 w-8 text-eco-primary" />
                            <span className="ml-2 text-xl font-cursive text-eco-dark font-bold">EcoStay</span>
                        </motion.div>

                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {navLinks.map((link) => (
                                <Link href={link.href} key={link.href} passHref>
                                    <motion.div
                                        className="relative"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <span className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                                            isActive(link.href)
                                                ? 'text-eco-dark font-semibold'
                                                : 'text-eco-medium hover:text-eco-dark'
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
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-2">
                        <motion.button
                            className="p-2 rounded-full text-eco-medium hover:text-eco-dark focus:outline-none"
                            whileHover={{ scale: 1.1, backgroundColor: '#f5f5f5' }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaSearch className="h-5 w-5" />
                        </motion.button>

                        <motion.button
                            className="p-2 rounded-full text-eco-medium hover:text-eco-dark focus:outline-none"
                            whileHover={{ scale: 1.1, backgroundColor: '#f5f5f5' }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaHeart className="h-5 w-5" />
                        </motion.button>

                        <motion.button
                            className="p-2 rounded-full text-eco-medium hover:text-eco-dark focus:outline-none"
                            whileHover={{ scale: 1.1, backgroundColor: '#f5f5f5' }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FaUser className="h-5 w-5" />
                        </motion.button>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <motion.button
                            className="inline-flex items-center justify-center p-2 rounded-md text-eco-medium hover:text-eco-dark hover:bg-eco-light focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="sm:hidden bg-white"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="pt-2 pb-3 space-y-1 px-4">
                            {navLinks.map((link) => (
                                <Link href={link.href} key={link.href} passHref>
                                    <motion.div
                                        className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                                            isActive(link.href)
                                                ? 'border-eco-primary bg-eco-light text-eco-dark'
                                                : 'border-transparent text-eco-medium hover:bg-eco-light hover:border-gray-300 hover:text-eco-dark'
                                        }`}
                                        whileHover={{ x: 5 }}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200 flex justify-around">
                            <motion.button
                                className="p-2 rounded-full text-eco-medium hover:text-eco-dark"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaSearch className="h-6 w-6" />
                            </motion.button>
                            <motion.button
                                className="p-2 rounded-full text-eco-medium hover:text-eco-dark"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaHeart className="h-6 w-6" />
                            </motion.button>
                            <motion.button
                                className="p-2 rounded-full text-eco-medium hover:text-eco-dark"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaUser className="h-6 w-6" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}