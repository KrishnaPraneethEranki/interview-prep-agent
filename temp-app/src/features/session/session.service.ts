import { PrepSession, SessionQuestion, Question } from '@/types';
import { mockDb } from '@/server/db/mock-db';
import { convertScoreToStars, computeSessionAverageScore, extractSessionImprovementAreas } from '@/lib/utils/rating';

// Hardcoded mock questions for populating new sessions
const MOCK_QUESTIONS_DB: Question[] = [
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

export class SessionService {
  createSession(userId: string, trackId: string, categoryId: string): PrepSession {
    const newSession: PrepSession = {
      id: `session_${Date.now()}`,
      userId,
      trackId,
      categoryId,
      startedAt: new Date().toISOString(),
    };

    mockDb.sessions.push(newSession);

    // Populate with a couple of questions
    const sessionQuestions: SessionQuestion[] = MOCK_QUESTIONS_DB.map((q, index) => ({
      id: `sq_${Date.now()}_${index}`,
      sessionId: newSession.id,
      questionId: q.id,
      order: index,
    }));

    mockDb.sessionQuestions.push(...sessionQuestions);

    return newSession;
  }

  getAllSessions(userId?: string): PrepSession[] {
    let sessions = mockDb.sessions;
    if (userId) {
      sessions = sessions.filter(s => s.userId === userId);
    }
    // Sort by startedAt descending (newest first)
    return sessions.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
  }

  getSession(sessionId: string): { session: PrepSession; questions: SessionQuestion[] } {
    const session = mockDb.sessions.find(s => s.id === sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const questions = mockDb.sessionQuestions
      .filter(q => q.sessionId === sessionId)
      .sort((a, b) => a.order - b.order);

    return { session, questions };
  }

  submitAnswer(sessionId: string, questionId: string, answer: string): SessionQuestion {
    const questionIndex = mockDb.sessionQuestions.findIndex(
      q => q.sessionId === sessionId && q.questionId === questionId
    );

    if (questionIndex === -1) {
      throw new Error('Session question not found');
    }

    // Evaluate Answer (Mock logic)
    const baseScore = answer.length > 50 ? 8 : 4; // Arbitrary simple logic for mock
    const stars = convertScoreToStars(baseScore);
    
    let strengths = ['Provided an answer'];
    let learningGaps = ['Needs more depth'];
    let misconceptions: string[] = [];
    
    if (baseScore > 6) {
      strengths.push('Good basic understanding');
      learningGaps = ['Missed advanced use cases'];
    } else {
      misconceptions.push('Answer lacked technical specificity');
    }

    const evaluatedQuestion: SessionQuestion = {
      ...mockDb.sessionQuestions[questionIndex],
      userAnswer: answer,
      knowledgeScore: baseScore,
      stars,
      strengths,
      learningGaps,
      misconceptions,
      improvedAnswer: 'A better answer would cover the definitions, tradeoffs, and a practical example.',
      extraExplanation: 'This topic requires deep knowledge of underlying systems.',
      followUpQuestion: 'How would you test this locally?'
    };

    mockDb.sessionQuestions[questionIndex] = evaluatedQuestion;

    return evaluatedQuestion;
  }

  getSessionSummary(sessionId: string) {
    const { session, questions } = this.getSession(sessionId);

    // Compute metrics
    const averageScore = computeSessionAverageScore(questions);
    const averageStars = convertScoreToStars(averageScore);
    const improvementAreas = extractSessionImprovementAreas(questions);

    // Update session
    const updatedSession = {
      ...session,
      endedAt: new Date().toISOString(),
      overallKnowledgeScore: averageScore,
      overallStars: averageStars,
    };

    const sessionIndex = mockDb.sessions.findIndex(s => s.id === sessionId);
    if (sessionIndex !== -1) {
      mockDb.sessions[sessionIndex] = updatedSession;
    }

    return {
      session: updatedSession,
      questions,
      ...improvementAreas
    };
  }
}

export const sessionService = new SessionService();
