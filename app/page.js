import SearchFilters from "@/app/components/SearchFilters";
import PropertyCard from "@/app/components/PropertyCard";


export const mockProperties = [
  {
    id: 1,
    title: "Wooden Eco Cabin",
    location: "Forest Retreat, Oregon",
    price: 120,
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isFavorite: true,
    type: "Cabin",
    beds: 2,
    baths: 1,
    amenities: ["Wifi", "Kitchen", "Parking"]
  },
  {
    id: 2,
    title: "Treehouse Getaway",
    location: "Redwood Forest, California",
    price: 195,
    rating: 4.9,
    reviewCount: 87,
    image: "https://images.unsplash.com/photo-1519643225200-94e79e383724?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isFavorite: false,
    type: "Treehouse",
    beds: 1,
    baths: 1,
    amenities: ["Wifi", "Hot tub", "Breakfast"]
  },
  {
    id: 3,
    title: "Lakeside Cottage",
    location: "Lake Tahoe, Nevada",
    price: 230,
    rating: 4.7,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isFavorite: true,
    type: "Cottage",
    beds: 3,
    baths: 2,
    amenities: ["Wifi", "Kitchen", "Fireplace", "Beach access"]
  },
  {
    id: 4,
    title: "Modern City Loft",
    location: "Downtown Chicago, Illinois",
    price: 175,
    rating: 4.6,
    reviewCount: 203,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isFavorite: false,
    type: "Apartment",
    beds: 1,
    baths: 1,
    amenities: ["Wifi", "Gym", "Pool", "Workspace"]
  },
  {
    id: 5,
    title: "Desert Adobe House",
    location: "Sedona, Arizona",
    price: 210,
    rating: 4.9,
    reviewCount: 92,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isFavorite: true,
    type: "House",
    beds: 2,
    baths: 2,
    amenities: ["Wifi", "Patio", "Mountain views", "Hot tub"]
  },
  {
    id: 6,
    title: "Beachfront Villa",
    location: "Malibu, California",
    price: 450,
    rating: 4.95,
    reviewCount: 68,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isFavorite: false,
    type: "Villa",
    beds: 4,
    baths: 3,
    amenities: ["Private beach", "Infinity pool", "Chef's kitchen", "Ocean view"]
  },
  {
    id: 7,
    title: "Alpine Ski Chalet",
    location: "Aspen, Colorado",
    price: 320,
    rating: 4.8,
    reviewCount: 115,
    image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isFavorite: true,
    type: "Chalet",
    beds: 3,
    baths: 2,
    amenities: ["Ski-in/ski-out", "Fireplace", "Sauna", "Mountain view"]
  },
  {
    id: 8,
    title: "Historic Brownstone",
    location: "Brooklyn, New York",
    price: 275,
    rating: 4.7,
    reviewCount: 143,
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isFavorite: false,
    type: "Townhouse",
    beds: 2,
    baths: 1.5,
    amenities: ["Wifi", "Garden", "Historical charm", "City view"]
  },
  {
    id: 9,
    title: "Romantic Windmill",
    location: "Amsterdam Countryside",
    price: 190,
    rating: 4.9,
    reviewCount: 56,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isFavorite: true,
    type: "Unique",
    beds: 1,
    baths: 1,
    amenities: ["Wifi", "Canalside", "Bicycle rental", "Breakfast"]
  },
  {
    id: 10,
    title: "Luxury Penthouse",
    location: "Miami Beach, Florida",
    price: 500,
    rating: 4.95,
    reviewCount: 78,
    image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isFavorite: false,
    type: "Penthouse",
    beds: 3,
    baths: 3.5,
    amenities: ["Rooftop pool", "Concierge", "Panoramic views", "Smart home"]
  }
];

export default function Home() {
  return (
      <div>
        <div className="bg-eco-white">
          <div className="relative bg-eco-primary overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="relative z-10 pb-8 bg-eco-primary sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
                  <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                    <div className="sm:text-center lg:text-left">
                      <h1 className="text-4xl tracking-tight font-extrabold text-eco-white sm:text-5xl md:text-6xl">
                        <span className="block font-cursive">Find your perfect</span>
                        <span className="block">eco getaway</span>
                      </h1>
                      <p className="mt-3 text-base text-eco-light sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        Discover sustainable stays that connect you with nature without compromising on comfort.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" alt="Eco cabin in the woods" />
            </div>
          </div>

          <SearchFilters />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-cursive text-eco-dark mb-8">Featured Stays</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mockProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}