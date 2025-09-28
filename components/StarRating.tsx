"use client";

import { useState } from 'react';
import Image from 'next/image';

interface StarRatingProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StarRating = ({ 
  initialRating = 0, 
  onRatingChange, 
  interactive = true,
  size = 'md'
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleStarClick = (starRating: number) => {
    if (!interactive) return;
    
    setRating(starRating);
    onRatingChange?.(starRating);
  };

  const handleStarHover = (starRating: number) => {
    if (!interactive) return;
    setHoverRating(starRating);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverRating(0);
  };

  return (
    <div className="flex items-center gap-1" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverRating || rating);
        return (
          <button
            key={star}
            type="button"
            className={`${sizeClasses[size]} transition-colors duration-200 ${
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            }`}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            disabled={!interactive}
          >
            <Image
              src={isFilled ? "/heart-filled.svg" : "/heart-outline.svg"}
              alt={`${star} star${star > 1 ? 's' : ''}`}
              width={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
              height={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
              className="w-full h-full"
            />
          </button>
        );
      })}
      {rating > 0 && (
        <span className="ml-2 text-sm text-gray-600">
          {rating}/5
        </span>
      )}
    </div>
  );
};

export default StarRating;
