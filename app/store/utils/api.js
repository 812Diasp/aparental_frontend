// app/utils/api.js
import axios from 'axios';

const API = 'http://localhost:8080';

// Создаем экземпляр axios с базовыми настройками
export const apiClient = axios.create({
    baseURL: API,
    withCredentials: true,
});

// Добавляем интерцептор для автоматического добавления токенов
apiClient.interceptors.request.use(
    async (config) => {
        // Получаем токен из хранилища (Redux или localStorage)
        const token = localStorage.getItem('authToken'); // или из Redux store

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Для запросов, изменяющих данные, добавляем CSRF токен
        if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
            try {
                const csrfResponse = await axios.get(`${API}/csrf`, { withCredentials: true });
                config.headers['X-CSRF-TOKEN'] = csrfResponse.data._csrf;
            } catch (error) {
                console.error('Failed to get CSRF token:', error);
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Интерцептор для обработки ошибок
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Перенаправление на страницу входа при истечении срока действия токена
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);