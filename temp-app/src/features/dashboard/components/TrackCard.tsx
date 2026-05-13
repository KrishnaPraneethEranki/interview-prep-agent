import { Track } from '@/types';
import { Card } from '@/components/shared/Card';
import Link from 'next/link';

interface TrackCardProps {
  track: Track;
}

export function TrackCard({ track }: TrackCardProps) {
  return (
    <Card className="p-6 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
      <div>
        <h3 className="text-xl font-semibold mb-2">{track.name}</h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Prepare for {track.name} interviews with structured, scenario-based sessions.
        </p>
      </div>
      <div className="mt-6">
        <Link 
          href={`/tracks/${track.id}`}
          className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          View Track Categories &rarr;
        </Link>
      </div>
    </Card>
  );
}
