import RatingStars from "@/app/components/RatingStars";


export default function ReviewCard({ review }) {
    return (
        <div className="border-b border-eco-lighter pb-6 last:border-0 last:pb-0">
            <div className="flex items-center space-x-4">
                <img className="w-12 h-12 rounded-full" src={review.user.avatar} alt={review.user.name} />
                <div>
                    <h4 className="font-medium text-eco-dark">{review.user.name}</h4>
                    <p className="text-sm text-eco-medium">{review.date}</p>
                </div>
            </div>
            <div className="mt-4">
                <RatingStars rating={review.rating} />
                <p className="mt-2 text-eco-dark">{review.comment}</p>
            </div>
        </div>
    );
}