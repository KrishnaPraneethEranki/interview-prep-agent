'use client';

import React, { useState } from 'react';
import { SessionProgress } from './SessionProgress';
import { QuestionCard } from './QuestionCard';
import { AnswerEditor } from './AnswerEditor';
import { FeedbackPanel } from './FeedbackPanel';
import { SessionQuestion, Question } from '@/types';
import { useRouter } from 'next/navigation';

// Mock Data
const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    categoryId: 'c1',
    prompt: 'Explain the difference between clustered and non-clustered indexes in SQL.',
    level: 'Intermediate',
    tags: ['Database', 'SQL', 'Performance'],
    expectedTopics: ['Physical storage', 'Pointers', 'Speed', 'Number of indexes'],
  },
  {
    id: 'q2',
    categoryId: 'c1',
    prompt: 'How would you handle a situation where your Node.js application is running out of memory?',
    level: 'Advanced',
    tags: ['Node.js', 'Debugging', 'Memory Management'],
    expectedTopics: ['Heap dump', 'Memory leaks', 'Garbage collection', 'Profiling tools'],
  }
];

const generateMockFeedback = (questionId: string, answer: string): Partial<SessionQuestion> => {
  if (questionId === 'q1') {
    return {
      knowledgeScore: 7,
      stars: 3.5,
      strengths: [
        'Correctly identified that clustered indexes affect physical order.',
        'Good mention of primary keys usually being clustered.'
      ],
      learningGaps: [
        'Did not explain how non-clustered indexes use pointers to the actual data.'
      ],
      misconceptions: [
        'Stated that you can have multiple clustered indexes per table (you can only have one).'
      ],
      improvedAnswer: 'A clustered index determines the physical order of data in a table, so there can only be one per table (typically the primary key). A non-clustered index does not alter the physical order; instead, it creates a separate structure containing the indexed columns and pointers to the actual data rows. Non-clustered indexes are good for exact match queries, while clustered are great for range queries.',
      extraExplanation: 'Think of a clustered index like a dictionary where the data is sorted alphabetically by the word. A non-clustered index is like the index at the back of a textbook; it lists topics and points you to the page number where the data lives.',
      followUpQuestion: 'When might you choose to create a non-clustered index over a clustered index for a specific query?'
    };
  } else {
    return {
      knowledgeScore: 9,
      stars: 4.5,
      strengths: [
        'Excellent systematic approach to debugging.',
        'Correctly suggested using heap dumps and Node.js built-in profiler.'
      ],
      learningGaps: [],
      misconceptions: [],
      improvedAnswer: 'To handle a memory leak in Node.js, I would first check monitoring tools (like PM2 or DataDog) to confirm the memory growth pattern. Then, I would take heap snapshots using `--inspect` and Chrome DevTools or a tool like `clinic.js` to compare memory allocation over time. I would look for objects that are not being garbage collected, such as uncleared intervals, event listener leaks, or global variables holding onto large arrays.',
      extraExplanation: 'Memory in Node.js is managed by V8 garbage collector. A leak occurs when an object is no longer needed but is still referenced by the root, preventing GC from freeing it.',
      followUpQuestion: 'How would you differentiate between a memory leak and just high memory usage under heavy load?'
    };
  }
};

interface SessionFlowProps {
  sessionId: string;
}

export function SessionFlow({ sessionId }: SessionFlowProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<Partial<SessionQuestion> | null>(null);

  const currentQuestion = MOCK_QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === MOCK_QUESTIONS.length - 1;

  const handleSubmit = (answer: string) => {
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      const feedback = generateMockFeedback(currentQuestion.id, answer);
      setCurrentFeedback(feedback);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Navigate to summary
      router.push(`/sessions/${sessionId}/summary`);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setCurrentFeedback(null);
      // We could also clear the answer editor state here if AnswerEditor is keyed properly
    }
  };

  if (!currentQuestion) return <div>Loading session...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Active Prep Session
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Take your time and explain your thought process clearly.
        </p>
      </div>

      <SessionProgress 
        currentQuestionIndex={currentIndex} 
        totalQuestions={MOCK_QUESTIONS.length} 
      />

      <QuestionCard 
        prompt={currentQuestion.prompt} 
        level={currentQuestion.level} 
        tags={currentQuestion.tags} 
      />

      {/* We use key={currentIndex} to completely remount the editor for a new question, clearing its internal state */}
      <AnswerEditor 
        key={`editor-${currentIndex}`}
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
        isSubmitted={!!currentFeedback} 
      />

      {currentFeedback && (
        <FeedbackPanel 
          feedback={currentFeedback} 
          onNext={handleNext} 
          isLastQuestion={isLastQuestion} 
        />
      )}
    </div>
  );
}
