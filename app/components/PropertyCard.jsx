'use client';

import { useState } from 'react';
import { FaHeart, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { IoBedOutline, IoWaterOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/app/store/slices/favoritesSlice';
import { cacheProperty } from '@/app/store/utils/propertyCache';
import BookingModal from '@/app/components/BookingModal';

export default function PropertyCard({ property }) {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.items);
    const isFavorite = favorites.includes(property.id);

    const [isHovered, setIsHovered] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);


// В компоненте PropertyCard
    const handleBookClick = () => {
        // Убедитесь, что property содержит все необходимые поля
        // особенно id (который будет использоваться как listingId) и price
        setShowBookingModal(true);
    };
    const handleFavoriteClick = () => {
        cacheProperty(property); // кэшируем объект
        dispatch(toggleFavorite(property.id)); // сохраняем id в избранное
    };

    return (
        <>
            <motion.div
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-eco-lighter"
                whileHover={{ y: -5 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative">
                    <motion.img
                        className="w-full h-48 object-cover"
                        src={property.image}
                        alt={property.title}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                    />

                    <motion.button
                        className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition"
                        whileTap={{ scale: 0.9 }}
                        onClick={handleFavoriteClick}
                        animate={{
                            scale: isHovered ? 1.1 : 1,
                            backgroundColor: isFavorite ? '#fff' : 'rgba(255, 255, 255, 0.8)',
                        }}
                    >
                        <FaHeart
                            className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-eco-medium'}`}
                        />
                    </motion.button>

                    <motion.div
                        className="absolute bottom-3 left-3 bg-eco-primary text-white text-xs px-2 py-1 rounded"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {property.type}
                    </motion.div>
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-start">
                        <motion.h3
                            className="text-lg font-semibold cursor-pointer text-eco-dark"
                            whileHover={{ color: '#3a7d44' }}
                        >
                            {property.title}
                        </motion.h3>
                        <div className="flex items-center">
                            <FaStar className="text-yellow-400 mr-1" />
                            <span className="text-sm font-medium text-eco-dark">
                {property.rating}
              </span>
                        </div>
                    </div>

                    <motion.div
                        className="flex items-center text-eco-medium mt-1"
                        whileHover={{ x: 2 }}
                    >
                        <FaMapMarkerAlt className="mr-1" size={12} />
                        <span className="text-sm">{property.location}</span>
                    </motion.div>

                    <div className="flex items-center mt-3 text-sm text-eco-dark">
                        <motion.div className="flex items-center mr-4" whileHover={{ scale: 1.05 }}>
                            <IoBedOutline className="mr-1" />
                            <span>{property.beds} beds</span>
                        </motion.div>
                        <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
                            <IoWaterOutline className="mr-1" />
                            <span>{property.baths} baths</span>
                        </motion.div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                        {property.amenities.map((amenity, index) => (
                            <motion.span
                                key={index}
                                className="text-xs cursor-pointer bg-eco-lighter text-eco-dark px-2 py-1 rounded"
                                whileHover={{ scale: 1.1, backgroundColor: '#e8f5e9' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {amenity}
                            </motion.span>
                        ))}
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <div>
                            <span className="text-eco-primary font-bold">${property.price}</span>
                            <span className="text-eco-medium text-sm"> / night</span>
                        </div>
                        <motion.button
                            className="bg-eco-primary cursor-pointer text-white px-4 py-2 rounded-md hover:bg-eco-secondary transition"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleBookClick}
                            animate={{
                                backgroundColor: isHovered ? '#4a9f55' : '#3a7d44',
                            }}
                        >
                            Book
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Модалка бронирования */}
            <BookingModal
                isOpen={showBookingModal}
                onClose={() => setShowBookingModal(false)}
                property={property}
            />
        </>
    );
}
