import React from 'react';
import { SessionQuestion } from '@/types';
import { MessageSquare, ThumbsUp, AlertCircle } from 'lucide-react';

interface QuestionReviewListProps {
  questions: SessionQuestion[];
}

export function QuestionReviewList({ questions }: QuestionReviewListProps) {
  // We need to fetch the actual question prompts. Since we only have questionId in SessionQuestion,
  // we would typically join this data. For the UI component, we'll assume the parent provides the mapped data 
  // or we render generically. To keep it simple, we'll render the userAnswer and feedback.

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Detailed Answer Review</h2>
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                Question {idx + 1}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Score:</span>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  {q.knowledgeScore}/10
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* User Answer */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Your Answer
                </h4>
                <p className="text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg italic text-sm">
                  "{q.userAnswer || 'No answer provided.'}"
                </p>
              </div>

              {/* Improved Answer */}
              {q.improvedAnswer && (
                <div>
                  <h4 className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    Improved Answer
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm border-l-2 border-purple-200 dark:border-purple-800 pl-4 py-1">
                    {q.improvedAnswer}
                  </p>
                </div>
              )}

              {/* Specific Gaps */}
              {((q.learningGaps && q.learningGaps.length > 0) || (q.misconceptions && q.misconceptions.length > 0)) && (
                <div>
                  <h4 className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Specific Gaps
                  </h4>
                  <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400 pl-6 list-disc marker:text-orange-400">
                    {q.learningGaps?.map((gap, i) => <li key={`gap-${i}`}>{gap}</li>)}
                    {q.misconceptions?.map((misc, i) => <li key={`misc-${i}`}>{misc}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
