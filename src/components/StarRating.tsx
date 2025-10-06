// src/components/StarRating.tsx
import { Star } from 'lucide-react';

interface StarRatingProps {
    rating: number | null | undefined;
}

export function StarRating({ rating }: StarRatingProps) {
    const totalStars = 5;
    const filledStars = rating || 0;

    return (
        <div className="flex items-center">
            {[...Array(totalStars)].map((_, index) => (
                <Star
                    key={index}
                    className={`h-4 w-4 ${index < filledStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                />
            ))}
        </div>
    );
}