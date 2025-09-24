'use client';

import { useEffect, useState } from 'react';
import SearchFilters from '@/app/components/SearchFilters';
import PropertyCard from '@/app/components/PropertyCard';
import Image from 'next/image';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Build query string from filter object
  const buildSearchQuery = (filters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return params.toString();
  };

  // Fetch properties with optional filters
  const fetchProperties = async (filters = {}) => {
    setLoading(true);
    const query = buildSearchQuery(filters);
    const url = `http://localhost:8080/api/properties${query ? `?${query}` : ''}`;

    try {
      const res = await fetch(url, {
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
        isFavorite: false,
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

  // Load all properties on mount
  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = (filters) => {
    fetchProperties(filters);
  };

  return (
      <div className="min-h-screen bg-gray-50">
        {/* === Hero Section (новая вёрстка) === */}
        <section className="relative bg-eco-primary overflow-hidden ">
          <div className="max-w-7xl mx-auto mt-24 ">
            {/* Картинка на всю ширину (на мобильных — сверху, на десктопе — слева) */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 lg:h-full">
              <Image
                  src="/house_mainpage.jpeg"
                  alt="Beautiful eco cabin nestled in the forest"
                  fill
                  className="object-cover"
                  priority
              />
            </div>

            {/* Контент (текст и фильтры) */}
            <div className="pt-10 sm:pt-16 lg:pt-8 lg:ml-auto lg:w-1/2 lg:ml-0 lg:pl-16">
              <div className="px-4 sm:px-6 lg:px-0">
                {/* Текст */}
                <div className="max-w-lg mx-auto lg:mx-0">
                  <h1 className="text-4xl tracking-tight font-extrabold text-eco-white sm:text-5xl md:text-6xl">
                    <span className="block font-cursive">Find your perfect</span>
                    <span className="block">eco getaway</span>
                  </h1>
                  <p className="mt-3 text-base text-eco-light sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
                    Discover sustainable stays that connect you with nature without compromising on comfort.
                  </p>
                </div>

                {/* SearchFilters — внизу hero, центрированы, вылезают */}
                <div className="mt-16 lg:mt-32 relative z-20">
                  <div className="flex justify-center">
                    <div className="w-full max-w-3xl -mb-6">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className={'mb-12'}>
          {/*<SearchFilters onSearch={handleSearch} />*/}
        </div>

        {/* === Properties Grid === */}
        <main className="max-w-7xl mx-auto p-6 -mt-12 relative z-10">
          <h2 className="text-3xl font-cursive text-eco-dark mb-8">
            {loading ? 'Loading stays...' : properties.length > 0 ? 'Featured Stays' : 'No stays found'}
          </h2>

          {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-primary"></div>
              </div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
              </div>
          )}
        </main>
      </div>
  );
}