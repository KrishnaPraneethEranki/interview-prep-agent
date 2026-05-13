import { notFound } from 'next/navigation';
import { sessionService } from '@/features/session/session.service';
import { SummaryScoreCard } from '@/components/session/summary/SummaryScoreCard';
import { SummaryInsights } from '@/components/session/summary/SummaryInsights';
import { NextTopicsCard } from '@/components/session/summary/NextTopicsCard';
import { QuestionReviewList } from '@/components/session/summary/QuestionReviewList';

export default async function SessionSummaryPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  
  let summaryData;
  try {
    // Invoke service directly since we are on the server and using a shared in-memory mock-db.
    // In production, this would hit the real DB using Prisma/Drizzle.
    summaryData = sessionService.getSessionSummary(sessionId);
  } catch (error) {
    notFound();
  }

  const { session, questions, learningGaps, misconceptions } = summaryData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Session Completed!
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Great job practicing. Here's a detailed breakdown of your performance.
          </p>
        </div>

        {/* Top Grid: Score & Insights */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1">
            <SummaryScoreCard 
              score={session.overallKnowledgeScore || 0} 
              stars={session.overallStars || 0} 
            />
            <NextTopicsCard 
              categoryId={session.categoryId} 
              learningGaps={learningGaps} 
            />
          </div>
          
          <div className="xl:col-span-2">
            <SummaryInsights 
              questions={questions} 
              learningGaps={learningGaps} 
              misconceptions={misconceptions} 
            />
          </div>
        </div>

        {/* Question Review */}
        <QuestionReviewList questions={questions} />
        
      </div>
    </div>
  );
}
