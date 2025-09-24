// app/components/BookingModal.js
'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DateRange } from 'react-date-range';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking, clearBooking } from '@/app/store/slices/bookingSlice';
import { useRouter } from 'next/navigation';
import { format, addDays, isSameDay } from 'date-fns';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function BookingModal({ isOpen, onClose, property }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, error, current } = useSelector((state) => state.booking);
    const { isAuthenticated, token } = useSelector((state) => state.auth);
    const [totalPrice, setTotalPrice] = useState(0);
    const [nights, setNights] = useState(0);
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [availabilityError, setAvailabilityError] = useState('');
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(Date.now() + 86400000),
            key: 'selection',
        },
    ]);

    // Функция для получения занятых дат
    const fetchUnavailableDates = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/properties/${property.id}/unavailable-dates`);
            if (response.ok) {
                const dates = await response.json();
                setUnavailableDates(dates.map(date => new Date(date)));
            }
        } catch (error) {
            console.error('Ошибка при получении занятых дат:', error);
        }
    };

    // Функция для проверки доступности выбранных дат
    const checkAvailability = async (startDate, endDate) => {
        setIsCheckingAvailability(true);
        setAvailabilityError('');

        try {
            const start = format(startDate, 'yyyy-MM-dd');
            const end = format(endDate, 'yyyy-MM-dd');

            const response = await fetch(
                `http://localhost:8080/api/properties/${property.id}/availability?startDate=${start}&endDate=${end}`
            );

            if (response.ok) {
                const isAvailable = await response.json();
                if (!isAvailable) {
                    setAvailabilityError('Выбранные даты уже заняты. Пожалуйста, выберите другие даты.');
                }
                return isAvailable;
            }
            return false;
        } catch (error) {
            console.error('Ошибка при проверке доступности:', error);
            setAvailabilityError('Ошибка при проверке доступности. Попробуйте еще раз.');
            return false;
        } finally {
            setIsCheckingAvailability(false);
        }
    };

    useEffect(() => {
        if (isOpen && property?.id) {
            fetchUnavailableDates();
        }
    }, [isOpen, property?.id]);

    useEffect(() => {
        if (dateRange[0].startDate && dateRange[0].endDate && property.price) {
            const start = new Date(dateRange[0].startDate);
            const end = new Date(dateRange[0].endDate);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

            setNights(days);
            setTotalPrice(days * property.price);

            // Проверяем доступность при изменении дат
            if (days > 0) {
                checkAvailability(start, end);
            }
        }
    }, [dateRange, property.price]);

    useEffect(() => {
        if (!isOpen) {
            dispatch(clearBooking());
            setDateRange([
                {
                    startDate: new Date(),
                    endDate: new Date(Date.now() + 86400000),
                    key: 'selection',
                },
            ]);
            setAvailabilityError('');
            setUnavailableDates([]);
        }
    }, [isOpen, dispatch]);

    // Функция для проверки, является ли дата недоступной
    const isDateUnavailable = (date) => {
        return unavailableDates.some(unavailableDate =>
            isSameDay(new Date(unavailableDate), new Date(date))
        );
    };

    // Функция для проверки диапазона дат на доступность
    const isRangeUnavailable = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        let current = new Date(start);

        while (current <= end) {
            if (isDateUnavailable(current)) {
                return true;
            }
            current = addDays(current, 1);
        }
        return false;
    };

    const handleConfirm = async () => {
        if (!isAuthenticated || !token) {
            alert('Пожалуйста, войдите в систему для бронирования');
            router.push('/pages/login');
            onClose();
            return;
        }

        const startDate = dateRange[0].startDate;
        const endDate = dateRange[0].endDate;

        // Проверяем доступность перед отправкой
        const isAvailable = await checkAvailability(startDate, endDate);

        if (!isAvailable) {
            return; // Не продолжаем, если даты заняты
        }

        const startDateStr = format(startDate, 'yyyy-MM-dd');
        const endDateStr = format(endDate, 'yyyy-MM-dd');

        dispatch(createBooking({
            propertyId: property.id,
            startDate: startDateStr,
            endDate: endDateStr
        }));
    };

    useEffect(() => {
        if (current && !loading) {
            const timer = setTimeout(() => {
                onClose();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [current, loading, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()}
                transition={{ type: 'spring', damping: 30 }}
            >
                <h2 className="text-xl font-bold mb-4 text-black">Бронирование {property.title}</h2>

                {!isAuthenticated ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">Для бронирования необходимо войти в систему</p>
                        <button
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            onClick={() => {
                                onClose();
                                router.push('/pages/login');
                            }}
                        >
                            Войти
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">Выберите даты (красным отмечены занятые даты):</p>
                            <div className="rounded-lg overflow-hidden border border-gray-200">
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={(item) => {
                                        const newRange = [item.selection];
                                        setDateRange(newRange);
                                    }}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dateRange}
                                    minDate={new Date()}
                                    rangeColors={['#3a7d44']}
                                    disabledDay={(date) => isDateUnavailable(date)}
                                    dayContentRenderer={(date) => {
                                        const isDisabled = isDateUnavailable(date);
                                        return (
                                            <div className={isDisabled ? 'text-red-500 line-through' : ''}>
                                                {date.getDate()}
                                            </div>
                                        );
                                    }}
                                />
                            </div>

                            {unavailableDates.length > 0 && (
                                <p className="text-xs text-gray-500 mt-2">
                                    ❌ Занятые даты отмечены красным
                                </p>
                            )}
                        </div>

                        {availabilityError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm font-medium">⚠️ {availabilityError}</p>
                            </div>
                        )}

                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between mb-2 text-black">
                                <span>Цена за ночь:</span>
                                <span className="font-semibold">${property.price} </span>
                            </div>
                            <div className="flex justify-between mb-2 text-black">
                                <span>Количество ночей:</span>
                                <span className="font-semibold">{nights}</span>
                            </div>
                            <div className="flex justify-between font-bold text-green-600 border-t pt-2 mt-2">
                                <span>Итого:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        {loading && (
                            <p className="text-sm text-gray-500 mt-3 text-center">
                                Обработка бронирования...
                            </p>
                        )}
                        {error && (
                            <p className="text-sm text-red-500 mt-3 text-center">
                                ❌ {typeof error === 'string' ? error : 'Ошибка бронирования'}
                            </p>
                        )}
                        {current && (
                            <div className="text-sm text-green-600 mt-3 text-center p-3 bg-green-50 rounded-lg">
                                ✅ Бронирование успешно создано!
                                <p className="text-xs mt-1">Номер бронирования: {current.id}</p>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Отмена
                            </button>
                            <button
                                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                                onClick={handleConfirm}
                                disabled={
                                    loading ||
                                    nights === 0 ||
                                    !!current ||
                                    isCheckingAvailability ||
                                    availabilityError !== '' ||
                                    isRangeUnavailable(dateRange[0].startDate, dateRange[0].endDate)
                                }
                            >
                                {loading ? 'Бронируем...' :
                                    isCheckingAvailability ? 'Проверяем...' :
                                        current ? 'Забронировано!' :
                                            'Забронировать'}
                            </button>
                        </div>
                    </>
                )}
            </motion.div>
        </motion.div>,
        document.body
    );
}