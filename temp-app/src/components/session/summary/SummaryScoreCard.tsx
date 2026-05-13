import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { getMasteryLabel } from '@/lib/utils/rating';

interface SummaryScoreCardProps {
  score: number;
  stars: number;
}

export function SummaryScoreCard({ score, stars }: SummaryScoreCardProps) {
  const masteryLabel = getMasteryLabel(score);
  
  const renderStars = () => {
    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 !== 0;
    const emptyStars = 5 - Math.ceil(stars);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-8 h-8 fill-yellow-500 text-yellow-500" />
        ))}
        {hasHalfStar && <StarHalf className="w-8 h-8 fill-yellow-500 text-yellow-500" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-8 h-8 text-gray-300 dark:text-gray-600" />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg flex flex-col items-center justify-center text-center">
      <h2 className="text-blue-100 uppercase tracking-widest text-sm font-semibold mb-6">
        Overall Knowledge Rating
      </h2>
      
      <div className="flex flex-col items-center gap-4 mb-6">
        {renderStars()}
        <div className="flex items-baseline gap-2">
          <span className="text-6xl font-extrabold">{score.toFixed(1)}</span>
          <span className="text-blue-200 text-xl font-medium">/ 10</span>
        </div>
      </div>

      <div className="bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm border border-white/20">
        <span className="text-blue-50 font-medium">Mastery Level: </span>
        <span className="font-bold text-white ml-1">{masteryLabel}</span>
      </div>
      
      <p className="mt-6 text-sm text-blue-200 max-w-md mx-auto">
        This rating strictly represents the knowledge you demonstrated during this session. Mistakes are tracked separately as learning gaps below.
      </p>
    </div>
  );
}
