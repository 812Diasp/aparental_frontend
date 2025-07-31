import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';

export default function SearchFilters() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 -mt-10 relative z-20">
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-eco-medium" />
                        </div>
                        <input
                            type="text"
                            className="block text-eco-dark w-full pl-10 pr-3 py-2 border border-eco-lighter rounded-lg focus:ring-eco-primary focus:border-eco-primary"
                            placeholder="Where to?"
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaCalendarAlt className="text-eco-medium" />
                        </div>
                        <input
                            type="text"
                            className="block text-eco-dark w-full pl-10 pr-3 py-2 border border-eco-lighter rounded-lg focus:ring-eco-primary focus:border-eco-primary"
                            placeholder="Check in - Check out"
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUserFriends className="text-eco-medium" />
                        </div>
                        <select
                            className="block text-eco-dark w-full pl-10 pr-3 py-2 border border-eco-lighter rounded-lg focus:ring-eco-primary focus:border-eco-primary appearance-none bg-white"
                        >
                            <option>1 guest</option>
                            <option>2 guests</option>
                            <option>3 guests</option>
                            <option>4+ guests</option>
                        </select>
                    </div>
                    <button className="bg-eco-primary text-white px-6 py-2 rounded-lg hover:bg-eco-secondary transition flex items-center justify-center">
                        <FaSearch className="mr-2" />
                        Search
                    </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    <button className="text-xs bg-eco-lighter text-eco-dark px-3 py-1 rounded-full hover:bg-eco-light transition">
                        Cabins
                    </button>
                    <button className="text-xs bg-eco-lighter text-eco-dark px-3 py-1 rounded-full hover:bg-eco-light transition">
                        Treehouses
                    </button>
                    <button className="text-xs bg-eco-lighter text-eco-dark px-3 py-1 rounded-full hover:bg-eco-light transition">
                        Tiny homes
                    </button>
                    <button className="text-xs bg-eco-lighter text-eco-dark px-3 py-1 rounded-full hover:bg-eco-light transition">
                        Beachfront
                    </button>
                    <button className="text-xs bg-eco-lighter text-eco-dark px-3 py-1 rounded-full hover:bg-eco-light transition">
                        Farms
                    </button>
                </div>
            </div>
        </div>
    );
}