import { PageHeader } from "@/components/layout/PageHeader";
import { mockTracks, mockCategories, mockRatings, mockSessions } from "@/lib/constants/mock-data";
import { TrackCard } from "@/features/dashboard/components/TrackCard";
import { CategoryRatingCard } from "@/features/dashboard/components/CategoryRatingCard";
import { RecentSessionList } from "@/features/dashboard/components/RecentSessionList";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <PageHeader 
        title="Dashboard" 
        description="Welcome back! Continue your interview preparation." 
      />

      <section>
        <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Your Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockTracks.map(track => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Skill Knowledge Overview</h2>
          <span className="text-sm text-zinc-500">Based on past performance</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCategories.map(category => {
            const rating = mockRatings.find(r => r.categoryId === category.id);
            return (
              <CategoryRatingCard 
                key={category.id} 
                category={category} 
                rating={rating} 
              />
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Recent Sessions</h2>
        <RecentSessionList sessions={mockSessions} categories={mockCategories} />
      </section>
    </div>
  );
}
