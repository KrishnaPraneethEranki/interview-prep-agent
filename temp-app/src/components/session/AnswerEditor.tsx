import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface AnswerEditorProps {
  onSubmit: (answer: string) => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
  initialValue?: string;
}

export function AnswerEditor({
  onSubmit,
  isSubmitting,
  isSubmitted,
  initialValue = '',
}: AnswerEditorProps) {
  const [answer, setAnswer] = useState(initialValue);

  const handleSubmit = () => {
    if (answer.trim() && !isSubmitting && !isSubmitted) {
      onSubmit(answer);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex justify-between items-center mb-3">
        <label
          htmlFor="answer-editor"
          className="text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          Your Answer
        </label>
        {isSubmitted && (
          <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 px-2 py-1 rounded">
            Submitted
          </span>
        )}
      </div>
      <textarea
        id="answer-editor"
        rows={6}
        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:text-gray-100 disabled:opacity-60 disabled:cursor-not-allowed resize-y transition-colors"
        placeholder="Type your detailed answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={isSubmitting || isSubmitted}
      />
      
      {!isSubmitted && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!answer.trim() || isSubmitting}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Evaluating...
              </>
            ) : (
              <>
                Submit Answer
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
