// app/pages/favorites/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import PropertyCard from '@/app/components/PropertyCard';
import { FaHeart } from 'react-icons/fa';
import Link from 'next/link';
import { loadFavorites } from '@/app/store/slices/favoritesSlice';
import {getCachedProperties} from "@/app/store/utils/propertyCache";

export default function FavoritesPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.items);
    const [favoriteProperties, setFavoriteProperties] = useState([]);

    useEffect(() => {
        dispatch(loadFavorites());
    }, [dispatch]);

    useEffect(() => {
        if (favorites.length > 0) {
            const properties = getCachedProperties(favorites);
            setFavoriteProperties(properties);
        } else {
            setFavoriteProperties([]);
        }
    }, [favorites]);

    return (
        <div className={'bg-white'}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-cursive text-eco-dark">Your Favorites</h1>
                    <Link href="/pages/explore">
                        <button className="text-eco-primary hover:underline">Back to Explore</button>
                    </Link>
                </div>

                {favoriteProperties.length === 0 ? (
                    <div className="text-center py-12">
                        <FaHeart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl text-eco-dark mb-2">No favorites yet</h3>
                        <p className="text-eco-medium">
                            Add properties to your favorites by clicking the heart icon.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {favoriteProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
}