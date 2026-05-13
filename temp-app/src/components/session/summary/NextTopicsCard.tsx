import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface NextTopicsCardProps {
  categoryId: string;
  learningGaps: string[];
}

export function NextTopicsCard({ categoryId, learningGaps }: NextTopicsCardProps) {
  // Simple heuristic: if there are learning gaps, recommend focusing on them.
  // Otherwise, recommend general advanced topics or next steps.
  const recommendations = learningGaps.length > 0 
    ? learningGaps.slice(0, 3) 
    : ['Advanced architectural patterns', 'Deep dive into performance optimization'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mt-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-lg text-purple-600 dark:text-purple-400">
          <BookOpen className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recommended Focus Areas</h2>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Based on your session, we recommend reviewing these concepts before your next practice:
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {recommendations.map((topic, i) => (
          <span 
            key={i} 
            className="inline-flex items-center px-3 py-1.5 rounded-md text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {topic}
          </span>
        ))}
      </div>

      <div className="flex justify-end">
        <Link 
          href={`/categories/${categoryId}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          Return to Category Dashboard
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
