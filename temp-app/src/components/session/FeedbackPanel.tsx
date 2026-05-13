import React from 'react';
import { SessionQuestion } from '@/types';
import { Star, StarHalf, CheckCircle2, AlertTriangle, Lightbulb, MessageSquare, ArrowRight } from 'lucide-react';

interface FeedbackPanelProps {
  feedback: Partial<SessionQuestion>;
  onNext: () => void;
  isLastQuestion: boolean;
}

export function FeedbackPanel({ feedback, onNext, isLastQuestion }: FeedbackPanelProps) {
  if (!feedback) return null;

  const renderStars = (stars: number = 0) => {
    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 !== 0;
    const emptyStars = 5 - Math.ceil(stars);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-6 h-6 fill-yellow-500 text-yellow-500" />
        ))}
        {hasHalfStar && <StarHalf className="w-6 h-6 fill-yellow-500 text-yellow-500" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-6 h-6 text-gray-300 dark:text-gray-600" />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Knowledge Rating Section (Separated from Improvement Areas) */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border border-blue-100 dark:border-gray-700 shadow-sm">
        <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-2">
          Knowledge Rating
        </h3>
        <div className="flex items-end gap-4">
          {renderStars(feedback.stars)}
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {feedback.knowledgeScore}/10
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          This rating represents your demonstrated knowledge of the topic based on your answer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        {feedback.strengths && feedback.strengths.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-green-200 dark:border-green-900/50 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-bold text-green-700 dark:text-green-400 uppercase tracking-wider mb-4">
              <CheckCircle2 className="w-5 h-5" />
              Strengths
            </h3>
            <ul className="space-y-2">
              {feedback.strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 mt-0.5">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Improvement Areas (Learning Gaps & Misconceptions) */}
        {(feedback.learningGaps?.length || feedback.misconceptions?.length) ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-orange-200 dark:border-orange-900/50 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider mb-4">
              <AlertTriangle className="w-5 h-5" />
              Improvement Areas
            </h3>
            <div className="space-y-4">
              {feedback.learningGaps && feedback.learningGaps.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">Missing Concepts</h4>
                  <ul className="space-y-2">
                    {feedback.learningGaps.map((gap, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-orange-500 mt-0.5">•</span>
                        {gap}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {feedback.misconceptions && feedback.misconceptions.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">Misconceptions</h4>
                  <ul className="space-y-2">
                    {feedback.misconceptions.map((misc, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-red-500 mt-0.5">•</span>
                        {misc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {/* Improved Answer & Explanation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="flex items-center gap-2 text-sm font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider mb-4">
          <Lightbulb className="w-5 h-5" />
          Improved Answer & Explanation
        </h3>
        {feedback.improvedAnswer && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">Better way to answer</h4>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-gray-700 dark:text-gray-300 text-sm border-l-4 border-purple-500">
              {feedback.improvedAnswer}
            </div>
          </div>
        )}
        {feedback.extraExplanation && (
          <div>
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase">Deep Dive</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {feedback.extraExplanation}
            </p>
          </div>
        )}
      </div>

      {/* Follow-up Question */}
      {feedback.followUpQuestion && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 shadow-sm flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex-1">
            <h3 className="flex items-center gap-2 text-sm font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-2">
              <MessageSquare className="w-5 h-5" />
              Follow-up Thought
            </h3>
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              {feedback.followUpQuestion}
            </p>
          </div>
          <button
            onClick={onNext}
            className="flex-shrink-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto justify-center"
          >
            {isLastQuestion ? 'Finish Session' : 'Next Question'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
