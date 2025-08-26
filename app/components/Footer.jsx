'use client';

import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { GiWoodFrame,GiSprout } from 'react-icons/gi';
import { useRouter } from 'next/navigation';

export default function Footer() {
    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path);
    };

    return (
        <footer className="bg-eco-darker text-eco-white py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Основной контент футера */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* О проекте */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                    >
                        <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => handleNavigation('/')}
                        >
                            <GiWoodFrame className="text-eco-primary" size={28} />
                            <span className="text-2xl font-cursive text-white">EcoStay</span>
                        </div>
                        <p className="text-eco-light text-sm leading-relaxed">
                            We believe in sustainable travel that respects nature and supports local communities.
                            Find your next eco-friendly escape with us.
                        </p>
                        <div className="flex space-x-4">
                            <motion.a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, color: '#1877f2' }}
                                className="text-eco-light hover:text-eco-primary"
                            >
                                <FaFacebook size={20} />
                            </motion.a>
                            <motion.a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, color: '#e1306c' }}
                                className="text-eco-light hover:text-eco-primary"
                            >
                                <FaInstagram size={20} />
                            </motion.a>
                            <motion.a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, color: '#1da1f2' }}
                                className="text-eco-light hover:text-eco-primary"
                            >
                                <FaTwitter size={20} />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Быстрые ссылки */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-2 text-eco-light text-sm">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Properties', path: '/properties' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Contact', path: '/contact' },
                                { name: 'Sustainability', path: '/sustainability' },
                            ].map((item) => (
                                <li key={item.name}>
                                    <motion.button
                                        onClick={() => handleNavigation(item.path)}
                                        className="hover:text-eco-primary transition-colors"
                                        whileHover={{ x: 5 }}
                                    >
                                        {item.name}
                                    </motion.button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Контакты */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                        <ul className="space-y-3 text-eco-light text-sm">
                            <li className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="text-eco-primary mt-1 flex-shrink-0" size={16} />
                                <span>Green Valley, Forest Hills, Natureland</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaPhone className="text-eco-primary" size={16} />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaEnvelope className="text-eco-primary" size={16} />
                                <span>hello@ecostay.com</span>
                            </li>
                        </ul>
                    </motion.div>

                </div>

                {/* Нижняя полоса */}
                <motion.div
                    className="border-t border-eco-lighter/30 mt-10 pt-6 text-center text-eco-light text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <p>
                        © {new Date().getFullYear()} EcoStay <GiSprout className="inline text-green-500" size={16} /> — Sustainable Stays for a Greener Tomorrow.
                        <br className="sm:hidden" />
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}