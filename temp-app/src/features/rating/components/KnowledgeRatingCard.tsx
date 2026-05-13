import { SkillRating } from '@/types';
import { Card } from '@/components/shared/Card';
import { StarRating } from '@/components/shared/StarRating';

interface KnowledgeRatingCardProps {
  rating?: SkillRating;
}

export function KnowledgeRatingCard({ rating }: KnowledgeRatingCardProps) {
  if (!rating) {
    return (
      <Card className="p-6 h-full flex flex-col items-center justify-center text-center">
        <p className="text-zinc-500 mb-2">No rating established yet.</p>
        <p className="text-sm text-zinc-400">Complete sessions to build your knowledge score.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 h-full border-l-4 border-l-blue-500 dark:border-l-blue-400">
      <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
        Current Knowledge Rating
      </h3>
      <div className="flex items-end gap-4 mb-4">
        <div className="text-5xl font-bold text-zinc-900 dark:text-zinc-50">
          {rating.averageKnowledgeScore10.toFixed(1)}
        </div>
        <div className="mb-1 text-lg font-medium text-blue-600 dark:text-blue-400">
          {rating.masteryLabel}
        </div>
      </div>
      <div className="mb-6">
        <StarRating stars={rating.averageStars5} maxStars={5} />
      </div>
      <div className="flex justify-between items-center text-sm pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <span className="text-zinc-500">Based on {rating.totalSessions} sessions</span>
        <span className={`font-medium ${rating.trend === 'up' ? 'text-green-600' : rating.trend === 'down' ? 'text-red-600' : 'text-zinc-500'}`}>
          {rating.trend === 'up' ? '↗ Trending Up' : rating.trend === 'down' ? '↘ Trending Down' : '→ Stable'}
        </span>
      </div>
    </Card>
  );
}
