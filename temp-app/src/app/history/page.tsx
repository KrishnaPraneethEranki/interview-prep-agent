import { sessionService } from '@/features/session/session.service';
import { SessionHistoryClient } from '@/components/history/SessionHistoryClient';

export default function HistoryPage() {
  // We can fetch data directly from the service on the server component
  const sessions = sessionService.getAllSessions();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            Session History
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Review your past preparation sessions, track your knowledge growth over time, and revisit your personalized feedback.
          </p>
        </div>

        <SessionHistoryClient initialSessions={sessions} />
      </div>
    </div>
  );
}
