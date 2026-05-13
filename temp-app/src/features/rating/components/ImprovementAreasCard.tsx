import { Card } from '@/components/shared/Card';

interface ImprovementArea {
  title: string;
  type: 'gap' | 'misconception';
}

interface ImprovementAreasCardProps {
  areas?: ImprovementArea[];
}

export function ImprovementAreasCard({ areas }: ImprovementAreasCardProps) {
  if (!areas || areas.length === 0) {
    return (
      <Card className="p-6 h-full flex flex-col items-center justify-center text-center">
        <p className="text-zinc-500">No improvement areas identified yet.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 h-full border-l-4 border-l-amber-500 dark:border-l-amber-400">
      <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
        Areas for Improvement
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        Topics to focus on in your next sessions. These do not directly lower your knowledge rating.
      </p>
      <ul className="space-y-3">
        {areas.map((area, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${area.type === 'misconception' ? 'bg-red-400' : 'bg-amber-400'}`} />
            <div>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{area.title}</span>
              <span className="ml-2 text-xs text-zinc-500 uppercase tracking-wide">
                ({area.type})
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
