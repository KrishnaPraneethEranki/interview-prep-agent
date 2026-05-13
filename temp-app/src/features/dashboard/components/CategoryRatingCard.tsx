import { Category, SkillRating } from '@/types';
import { Card } from '@/components/shared/Card';
import { StarRating } from '@/components/shared/StarRating';
import Link from 'next/link';

interface CategoryRatingCardProps {
  category: Category;
  rating?: SkillRating;
}

export function CategoryRatingCard({ category, rating }: CategoryRatingCardProps) {
  return (
    <Card className="p-6 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{category.name}</h3>
          <span className="inline-block mt-1 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded-md">
            {category.difficulty}
          </span>
        </div>
        {rating && (
          <div className="text-right">
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {rating.averageKnowledgeScore10.toFixed(1)}<span className="text-sm text-zinc-500 font-normal">/10</span>
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">
              {rating.masteryLabel}
            </div>
          </div>
        )}
      </div>

      {rating ? (
        <div className="mt-2 mb-6">
          <StarRating stars={rating.averageStars5} />
        </div>
      ) : (
        <div className="mt-2 mb-6 text-sm text-zinc-500 italic">
          No sessions completed yet.
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
        <span className="text-xs text-zinc-500">
          {rating ? `${rating.totalSessions} sessions` : 'Start your first session'}
        </span>
        <Link 
          href={`/categories/${category.id}`}
          className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-sm font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          Practice
        </Link>
      </div>
    </Card>
  );
}
