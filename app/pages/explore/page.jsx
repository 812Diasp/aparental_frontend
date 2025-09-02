// app/pages/explore/page.jsx
'use client';

import { useEffect, useState } from 'react';
import PropertyCard from '@/app/components/PropertyCard';

const Page = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    // Функция для преобразования фильтров (но здесь мы просто загружаем всё)
    const fetchProperties = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8080/api/properties', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                cache: 'no-store',
            });

            if (!res.ok) throw new Error(`Failed to fetch properties: ${res.status}`);

            const data = await res.json();

            const formatted = data.map((prop) => ({
                id: prop.id,
                title: prop.title,
                location: prop.location,
                price: prop.price,
                rating: prop.rating || 0,
                reviewCount: prop.reviewCount || 0,
                image: prop.image || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                isFavorite: false, // будет обновлено в PropertyCard через Redux
                type: prop.type || 'House',
                beds: prop.beds || 1,
                baths: prop.baths || 1,
                amenities: Array.isArray(prop.amenities) ? prop.amenities : [],
            }));

            setProperties(formatted);
        } catch (error) {
            console.error('Error fetching properties:', error);
            setProperties([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    return (
        <div className="bg-eco-white">
            {/* Properties Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-cursive text-eco-dark mb-4">Vacation Variants</h2>
                    <p className="text-lg text-eco-dark max-w-2xl mx-auto">
                        Choose from our curated collection of eco-friendly stays, each offering a unique connection to nature.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-primary"></div>
                    </div>
                ) : properties.length === 0 ? (
                    <p className="text-center text-eco-medium">No properties available</p>
                ) : (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;