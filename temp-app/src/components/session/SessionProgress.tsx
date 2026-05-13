import React from 'react';

interface SessionProgressProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

export function SessionProgress({
  currentQuestionIndex,
  totalQuestions,
}: SessionProgressProps) {
  const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
        <span>
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
        <span>{Math.round(progressPercentage)}% Completed</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
