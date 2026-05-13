import React from 'react';
import { DifficultyLevel } from '@/types';
import { HelpCircle } from 'lucide-react';

interface QuestionCardProps {
  prompt: string;
  level: DifficultyLevel;
  tags?: string[];
}

export function QuestionCard({ prompt, level, tags = [] }: QuestionCardProps) {
  const getLevelColor = (l: DifficultyLevel) => {
    switch (l) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Current Question
          </h2>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(
            level
          )}`}
        >
          {level}
        </span>
      </div>
      <p className="text-xl font-medium text-gray-900 dark:text-gray-100 leading-relaxed mb-4">
        {prompt}
      </p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
