import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function RatingStars({ rating }) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    // Half star
    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return <div className="flex">{stars}</div>;
}