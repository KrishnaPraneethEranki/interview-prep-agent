import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { SessionQuestion } from '@/types';

interface SummaryInsightsProps {
  questions: SessionQuestion[];
  learningGaps: string[];
  misconceptions: string[];
}

export function SummaryInsights({ questions, learningGaps, misconceptions }: SummaryInsightsProps) {
  // Aggregate strengths across all questions (deduplicated)
  const allStrengths = Array.from(
    new Set(questions.flatMap(q => q.strengths || []).filter(Boolean))
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Strengths Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-green-100 dark:border-green-900 shadow-sm h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg text-green-600 dark:text-green-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Demonstrated Strengths</h2>
        </div>
        
        {allStrengths.length > 0 ? (
          <ul className="space-y-3 flex-grow">
            {allStrengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{strength}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic">No specific strengths recorded for this session.</p>
        )}
      </div>

      {/* Learning Gaps Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-orange-100 dark:border-orange-900/50 shadow-sm h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-orange-100 dark:bg-orange-900/50 p-2 rounded-lg text-orange-600 dark:text-orange-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Improvement Areas</h2>
        </div>
        
        {learningGaps.length === 0 && misconceptions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 italic">No learning gaps identified! Great job.</p>
        ) : (
          <div className="space-y-6 flex-grow">
            {learningGaps.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                  Missing Concepts
                </h3>
                <ul className="space-y-3">
                  {learningGaps.map((gap, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-orange-500 mt-1 flex-shrink-0">•</span>
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {misconceptions.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 mt-4">
                  Misconceptions
                </h3>
                <ul className="space-y-3">
                  {misconceptions.map((misc, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{misc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
