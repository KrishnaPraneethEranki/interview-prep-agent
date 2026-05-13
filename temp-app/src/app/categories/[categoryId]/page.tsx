import { PageHeader } from "@/components/layout/PageHeader";
import { mockCategories, mockRatings, mockSessions, mockImprovementAreas } from "@/lib/constants/mock-data";
import { KnowledgeRatingCard } from "@/features/rating/components/KnowledgeRatingCard";
import { ImprovementAreasCard } from "@/features/rating/components/ImprovementAreasCard";
import { RecentSessionList } from "@/features/dashboard/components/RecentSessionList";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params;
  
  const category = mockCategories.find(c => c.id === categoryId);
  if (!category) {
    notFound();
  }

  const rating = mockRatings.find(r => r.categoryId === categoryId);
  const sessions = mockSessions.filter(s => s.categoryId === categoryId).sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
  const improvementAreas = mockImprovementAreas[categoryId] || [];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{category.name}</h1>
            <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-semibold rounded-full border border-zinc-200 dark:border-zinc-700">
              {category.difficulty}
            </span>
          </div>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
            {category.description}
          </p>
        </div>
        <div className="flex-shrink-0">
          <Link
            href={`/sessions/new?category=${category.id}`}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200 shadow-sm transition-colors w-full md:w-auto"
          >
            Start Practice Session
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KnowledgeRatingCard rating={rating} />
        <ImprovementAreasCard areas={improvementAreas} />
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Session History</h2>
        <RecentSessionList sessions={sessions} categories={mockCategories} />
      </section>
    </div>
  );
}
