import { MasteryLabel } from '@/types';

/**
 * Converts a 10-point knowledge score to a 5-star rating.
 * Formula: stars = score / 2
 * 
 * @param score - A number between 0 and 10.
 * @returns A number between 0 and 5.
 */
export function convertScoreToStars(score: number): number {
  if (score < 0) return 0;
  if (score > 10) return 5;
  return score / 2;
}

/**
 * Maps a 10-point knowledge score to a descriptive Mastery Label.
 * 
 * 0 to 2 = Beginner
 * 3 to 4 = Developing
 * 5 to 6 = Competent
 * 7 to 8 = Proficient
 * 9 to 10 = Mastery
 * 
 * @param score - A number between 0 and 10.
 * @returns The corresponding MasteryLabel.
 */
export function getMasteryLabel(score: number): MasteryLabel {
  const roundedScore = Math.round(score);
  
  if (roundedScore >= 9) return 'Mastery';
  if (roundedScore >= 7) return 'Proficient';
  if (roundedScore >= 5) return 'Competent';
  if (roundedScore >= 3) return 'Developing';
  return 'Beginner';
}

/**
 * Computes the average knowledge score for a session based ONLY on
 * the knowledge score of each question. Learning gaps and mistakes
 * do not reduce this score, preserving the separation of knowledge
 * rating and improvement areas.
 * 
 * @param questions - Array of SessionQuestion from a session.
 * @returns The average knowledge score out of 10.
 */
export function computeSessionAverageScore(questions: { knowledgeScore?: number }[]): number {
  if (!questions || questions.length === 0) return 0;
  
  const scoredQuestions = questions.filter(q => typeof q.knowledgeScore === 'number');
  if (scoredQuestions.length === 0) return 0;
  
  const totalScore = scoredQuestions.reduce((sum, q) => sum + (q.knowledgeScore || 0), 0);
  const average = totalScore / scoredQuestions.length;
  
  return Number(average.toFixed(1)); // Round to 1 decimal place
}

/**
 * Extracts and aggregates all learning gaps and misconceptions from a session.
 * This explicitly separates tracking mistakes from the knowledge score calculation.
 * 
 * @param questions - Array of SessionQuestion from a session.
 * @returns An object containing aggregated learning gaps and misconceptions.
 */
export function extractSessionImprovementAreas(
  questions: { learningGaps?: string[]; misconceptions?: string[] }[]
): { learningGaps: string[]; misconceptions: string[] } {
  if (!questions) return { learningGaps: [], misconceptions: [] };

  const allGaps = questions.flatMap(q => q.learningGaps || []);
  const allMisconceptions = questions.flatMap(q => q.misconceptions || []);

  // Remove duplicates and empty strings
  return {
    learningGaps: Array.from(new Set(allGaps.filter(Boolean))),
    misconceptions: Array.from(new Set(allMisconceptions.filter(Boolean))),
  };
}
