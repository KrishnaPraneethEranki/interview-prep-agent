import { PrepSession, Category } from '@/types';
import { Card } from '@/components/shared/Card';
import Link from 'next/link';
import { StarRating } from '@/components/shared/StarRating';

interface RecentSessionListProps {
  sessions: PrepSession[];
  categories: Category[];
}

export function RecentSessionList({ sessions, categories }: RecentSessionListProps) {
  if (sessions.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">No recent sessions found.</p>
      </Card>
    );
  }

  return (
    <Card className="divide-y divide-zinc-100 dark:divide-zinc-800">
      {sessions.map(session => {
        const category = categories.find(c => c.id === session.categoryId);
        const date = new Date(session.startedAt).toLocaleDateString('en-US', { 
          month: 'short', day: 'numeric', year: 'numeric' 
        });

        return (
          <div key={session.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {category?.name || 'Unknown Category'}
                </span>
                <span className="text-xs text-zinc-500">{date}</span>
              </div>
              {session.overallKnowledgeScore !== undefined && session.overallStars !== undefined && (
                <div className="flex items-center gap-3">
                  <StarRating stars={session.overallStars} />
                </div>
              )}
            </div>
            
            <Link 
              href={`/sessions/${session.id}/summary`}
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              View Summary &rarr;
            </Link>
          </div>
        );
      })}
    </Card>
  );
}
