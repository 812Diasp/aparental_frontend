'use client';

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {fetchMe} from "@/app/store/slices/userSlice";


export default function ProfilePage() {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.user);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(fetchMe());
        }
    }, [dispatch, token]);

    if (!token) {
        return <p className="text-center text-red-500 mt-10">Вы не авторизованы</p>;
    }

    if (loading) return <p className="text-center mt-10">Загрузка...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
            <h1 className="text-2xl font-bold mb-4">Мой профиль</h1>
            {data ? (
                <div className="space-y-2">
                    <p><strong>Имя:</strong> {data.fullName}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                    <p><strong>Город:</strong> {data.city}</p>
                    <p><strong>Страна:</strong> {data.country}</p>
                    <p><strong>Роль:</strong> {data.role}</p>
                </div>
            ) : (
                <p>Нет данных пользователя</p>
            )}
        </div>
    );
}
