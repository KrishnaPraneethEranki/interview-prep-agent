import { PrepSession, SessionQuestion } from '@/types';

class MockDatabase {
  sessions: PrepSession[] = [];
  sessionQuestions: SessionQuestion[] = [];

  constructor() {
    // Seed some initial data if needed
  }
}

// Singleton instance for in-memory persistence across API requests in dev mode
export const mockDb = new MockDatabase();
