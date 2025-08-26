'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "@/app/store/slices/authSlice";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [isRegister, setIsRegister] = useState(false);
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            if (isRegister) {
                // Регистрация + автоматический логин
                await dispatch(register(data)).unwrap();
            } else {
                // Логин
                await dispatch(login({ username: data.nickname, password: data.password })).unwrap();
            }

            // После успешного логина или регистрации — редирект
            router.push('/');
            router.refresh();
        } catch (err) {
            console.error('Action failed:', err);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Левая часть с картинкой */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-br from-eco-primary/90 to-purple-800"
            >
                <Image
                    // src="https://i.pinimg.com/originals/10/83/14/1083149d454aedb4b59c87d30477b486.jpg"
                    src={'/1547220657_original_12341_oboi_zelenye_gory_1920x1080.webp'}
                    alt="Login Illustration"
                    fill
                    className="object-cover opacity-70"
                />
                <motion.div
                    className="absolute text-white text-center p-6 z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
                        Welcome to EcoStay 🌿
                    </h1>
                    <p className="text-lg opacity-90">
                        Find your perfect eco-friendly stay around the world.
                    </p>
                </motion.div>
            </motion.div>

            {/* Правая часть с формой */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex w-full lg:w-1/2 items-center justify-center bg-white"
            >
                <div className="max-w-md w-full p-8 space-y-6 text-gray-800">
                    <h2 className="text-3xl font-bold  text-center">
                        {isRegister ? "Create Account" : "Sign In"}
                    </h2>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        {isRegister ? (
                            <>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    className="input-field w-full"
                                />
                                <input
                                    type="text"
                                    name="nickname"
                                    placeholder="Login Name"
                                    required
                                    className="input-field w-full"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    className="input-field w-full"
                                />
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    className="input-field w-full"
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    className="input-field w-full"
                                />
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    className="input-field w-full"
                                />
                                <input
                                    type="date"
                                    name="birthDate"
                                    className="input-field w-full"
                                />
                            </>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    name="nickname"
                                    placeholder="Login"
                                    required
                                    className="input-field w-full"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    className="input-field w-full"
                                />
                            </>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-eco-primary text-white font-semibold shadow-md hover:bg-eco-primary/90 transition"
                        >
                            {loading ? "..." : isRegister ? "Register" : "Login"}
                        </motion.button>
                    </form>

                    {error && (
                        <p className="text-center text-red-500 font-medium">{error}</p>
                    )}

                    <div className="text-center text-gray-600">
                        {isRegister ? (
                            <p>
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    className="text-eco-primary font-semibold hover:underline"
                                    onClick={() => setIsRegister(false)}
                                >
                                    Sign in
                                </button>
                            </p>
                        ) : (
                            <p>
                                Don’t have an account?{" "}
                                <button
                                    type="button"
                                    className="text-eco-primary font-semibold hover:underline"
                                    onClick={() => setIsRegister(true)}
                                >
                                    Register
                                </button>
                            </p>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

/* Tailwind helper */
const inputField = `
  border rounded-xl px-4 py-3 focus:ring-2 
  focus:ring-eco-primary focus:outline-none
  transition text-sm
`;
