export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type MasteryLabel = 'Beginner' | 'Developing' | 'Competent' | 'Proficient' | 'Mastery';

export type RatingTrend = 'up' | 'down' | 'flat';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Track {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  trackId: string;
  name: string;
  description: string;
  difficulty: DifficultyLevel;
}

export interface Question {
  id: string;
  categoryId: string;
  prompt: string;
  level: DifficultyLevel;
  tags: string[];
  expectedTopics: string[];
}

export interface PrepSession {
  id: string;
  userId: string;
  trackId: string;
  categoryId: string;
  startedAt: string;
  endedAt?: string;
  overallKnowledgeScore?: number;
  overallStars?: number;
}

export interface SessionQuestion {
  id: string;
  sessionId: string;
  questionId: string;
  order: number;
  userAnswer?: string;
  knowledgeScore?: number;
  stars?: number;
  strengths?: string[];
  learningGaps?: string[];
  misconceptions?: string[];
  improvedAnswer?: string;
  extraExplanation?: string;
  followUpQuestion?: string;
}

export interface SkillRating {
  id: string;
  userId: string;
  categoryId: string;
  averageKnowledgeScore10: number;
  averageStars5: number;
  totalSessions: number;
  trend: RatingTrend;
  masteryLabel: MasteryLabel;
}
