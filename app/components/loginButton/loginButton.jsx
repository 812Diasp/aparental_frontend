'use client';

import { motion } from 'framer-motion';
import { FaUser } from "react-icons/fa";

export default function LoginButton({ mobile = false }) {
    return (
        <motion.button
            className={`flex items-center justify-center ${
                mobile
                    ? "w-full px-3 py-2 rounded-md text-base font-medium text-eco-medium hover:bg-eco-light hover:text-eco-dark"
                    : "p-2 px-4 rounded-full text-eco-medium hover:text-eco-dark border border-eco-medium focus:outline-none"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {mobile ? (
                <>
                    <FaUser className="mr-2" /> Login
                </>
            ) : (
                "Login"
            )}
        </motion.button>
    );
}
