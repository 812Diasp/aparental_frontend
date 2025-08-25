'use client';

import { useState, useRef, useEffect } from 'react';
import { FaSearch, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import { DateRange } from 'react-date-range';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function SearchFilters() {
    const [showCalendar, setShowCalendar] = useState(false);
    const [dateRange, setDateRange] = useState([
        { startDate: new Date(), endDate: new Date(), key: 'selection' }
    ]);

    const calendarRef = useRef(null);

    const handleSelect = (ranges) => {
        setDateRange([ranges.selection]);
    };

    const handleClickOutside = (e) => {
        if (calendarRef.current && !calendarRef.current.contains(e.target)) {
            setShowCalendar(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formatDateRange = (start, end) => {
        const sameYear = start.getFullYear() === end.getFullYear();
        const options = { day: '2-digit', month: '2-digit' };
        const startStr = sameYear
            ? start.toLocaleDateString('en-GB', options)
            : start.toLocaleDateString('en-GB');
        const endStr = end.toLocaleDateString('en-GB');
        return `${startStr} - ${endStr}`;
    };

    const getNights = (start, end) => {
        const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return diff || 1;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 -mt-10 relative z-20">
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Where */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-eco-medium" />
                        </div>
                        <input
                            type="text"
                            className="block text-eco-dark w-full pl-10 pr-3 py-2 border border-eco-lighter rounded-lg focus:ring-2 focus:ring-eco-primary focus:border-eco-primary transition transform group-hover:scale-105"
                            placeholder="Where to?"
                        />
                    </div>

                    {/* Check in/out */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaCalendarAlt className="text-eco-medium" />
                        </div>
                        <input
                            type="text"
                            readOnly
                            onClick={() => setShowCalendar(!showCalendar)}
                            value={`${formatDateRange(dateRange[0].startDate, dateRange[0].endDate)} (${getNights(dateRange[0].startDate, dateRange[0].endDate)} nights)`}
                            className="block text-eco-dark w-full pl-10 pr-3 py-2 border border-eco-lighter rounded-lg focus:ring-2 focus:ring-eco-primary focus:border-eco-primary transition cursor-pointer transform group-hover:scale-105"
                        />

                        <AnimatePresence>
                            {showCalendar && (
                                <motion.div
                                    ref={calendarRef}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-12 z-50"
                                >
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={handleSelect}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dateRange}
                                        minDate={new Date()}
                                        rangeColors={['rgb(var(--eco-primary))']}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Guests */}
                    <div className="relative group hover:text-black">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUserFriends className="text-eco-medium text-black" />
                        </div>
                        <select
                            className="block text-eco-dark w-full pl-10 pr-3 py-2 border border-eco-lighter rounded-lg focus:ring-2 focus:ring-eco-primary focus:border-eco-primary appearance-none bg-white transition transform group-hover:scale-105"
                        >
                            <option>1 guest</option>
                            <option>2 guests</option>
                            <option>3 guests</option>
                            <option>4+ guests</option>
                        </select>
                    </div>

                    {/* Search */}
                    <button className="bg-eco-primary text-white px-6 py-2 rounded-lg hover:bg-eco-secondary transition transform hover:scale-105 flex items-center justify-center">
                        <FaSearch className="mr-2" />
                        Search
                    </button>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {['Cabins', 'Treehouses', 'Tiny homes', 'Beachfront', 'Farms'].map((tag) => (
                        <button
                            key={tag}
                            className="text-xs bg-eco-lighter text-eco-dark px-3 py-1 rounded-full hover:bg-eco-light transition transform hover:scale-105"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
