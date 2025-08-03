import React from 'react';
import { mockProperties } from "@/app/page";
import PropertyCard from "@/app/components/PropertyCard";

const Page = () => {
    return (
        <div className="bg-eco-white">
            {/* Hero Section with improved text styling */}

            {/* Properties Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-cursive text-eco-dark mb-4">Vacation Variants</h2>
                    <p className="text-lg text-eco-dark max-w-2xl mx-auto">
                        Choose from our curated collection of eco-friendly stays, each offering a unique connection to nature.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {mockProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;