'use client';

import { motion } from 'framer-motion';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../store/slices/authSlice";

export default function LoginModal({ onClose }) {
    const [isRegister, setIsRegister] = useState(false);
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        if (isRegister) {
            dispatch(register(data))
                .unwrap()
                .then(() => onClose()) // закрыть модалку после успеха
                .catch(() => {});
        } else {
            dispatch(login({ username: data.nickname, password: data.password }))
                .unwrap()
                .then(() => onClose())
                .catch(() => {});
        }
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
        >
            <motion.div
                className="bg-white text-black rounded-2xl p-6 w-96 relative shadow-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {/* Закрыть */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Заголовок */}
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isRegister ? 'Create Account' : 'Sign In'}
                </h2>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    {isRegister ? (
                        <>
                            {/* поля для регистрации */}
                            <label className="flex flex-col text-sm text-gray-600">
                                Email
                                <input name="email" type="email" required className="input-field" />
                            </label>
                            <label className="flex flex-col text-sm text-gray-600">
                                Login Name
                                <input name="nickname" type="text" required minLength={3} className="input-field" />
                            </label>
                            <label className="flex flex-col text-sm text-gray-600">
                                Password
                                <input name="password" type="password" required minLength={6} className="input-field" />
                            </label>
                            <label className="flex flex-col text-sm text-gray-600">
                                Full Name
                                <input name="fullName" type="text" className="input-field" />
                            </label>
                            <label className="flex flex-col text-sm text-gray-600">
                                City
                                <input name="city" className="input-field" />
                            </label>
                            <label className="flex flex-col text-sm text-gray-600">
                                Country
                                <input name="country" className="input-field" />
                            </label>
                            <label className="flex flex-col text-sm text-gray-600">
                                Birth Date
                                <input name="birthDate" type="date" className="input-field" />
                            </label>
                        </>
                    ) : (
                        <>
                            {/* поля для логина */}
                            <label className="flex flex-col text-sm text-gray-600">
                                Login
                                <input name="nickname" type="text" required className="input-field" />
                            </label>
                            <label className="flex flex-col text-sm text-gray-600">
                                Password
                                <input name="password" type="password" required className="input-field" />
                            </label>
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-eco-primary hover:bg-eco-primary/90 transition text-white p-2 rounded-xl font-semibold"
                    >
                        {loading ? "..." : isRegister ? 'Register' : 'Login'}
                    </button>
                </form>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                {/* Переключатель */}
                <div className="text-sm text-center mt-4 text-gray-600">
                    {isRegister ? (
                        <span>
                            Already have an account?{" "}
                            <button
                                type="button"
                                className="text-eco-primary font-medium hover:underline"
                                onClick={() => setIsRegister(false)}
                            >
                                Sign in
                            </button>
                        </span>
                    ) : (
                        <span>
                            Don’t have an account?{" "}
                            <button
                                type="button"
                                className="text-eco-primary font-medium hover:underline"
                                onClick={() => setIsRegister(true)}
                            >
                                Register
                            </button>
                        </span>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
