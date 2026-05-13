import { Track, Category, PrepSession, SkillRating } from '@/types';

export const mockTracks: Track[] = [
  { id: 't1', name: 'Full Stack Developer' },
  { id: 't2', name: 'Solutions Architect' }
];

export const mockCategories: Category[] = [
  { id: 'c1', trackId: 't1', name: 'React', description: 'React component lifecycle, hooks, and performance.', difficulty: 'Intermediate' },
  { id: 'c2', trackId: 't1', name: 'Node.js', description: 'Event loop, async programming, and APIs.', difficulty: 'Advanced' },
  { id: 'c3', trackId: 't1', name: 'System Design', description: 'Scalability, microservices, and databases.', difficulty: 'Advanced' },
];

export const mockRatings: SkillRating[] = [
  { id: 'r1', userId: 'u1', categoryId: 'c1', averageKnowledgeScore10: 7.5, averageStars5: 3.75, totalSessions: 4, trend: 'up', masteryLabel: 'Proficient' },
  { id: 'r2', userId: 'u1', categoryId: 'c2', averageKnowledgeScore10: 5.0, averageStars5: 2.5, totalSessions: 2, trend: 'flat', masteryLabel: 'Competent' },
  { id: 'r3', userId: 'u1', categoryId: 'c3', averageKnowledgeScore10: 3.0, averageStars5: 1.5, totalSessions: 5, trend: 'down', masteryLabel: 'Developing' },
];

export const mockSessions: PrepSession[] = [
  { id: 's1', userId: 'u1', trackId: 't1', categoryId: 'c1', startedAt: new Date(Date.now() - 86400000 * 2).toISOString(), endedAt: new Date(Date.now() - 86400000 * 2 + 1800000).toISOString(), overallKnowledgeScore: 8, overallStars: 4 },
  { id: 's2', userId: 'u1', trackId: 't1', categoryId: 'c3', startedAt: new Date(Date.now() - 86400000 * 5).toISOString(), endedAt: new Date(Date.now() - 86400000 * 5 + 3600000).toISOString(), overallKnowledgeScore: 4, overallStars: 2 },
  { id: 's3', userId: 'u1', trackId: 't1', categoryId: 'c1', startedAt: new Date(Date.now() - 86400000 * 10).toISOString(), endedAt: new Date(Date.now() - 86400000 * 10 + 2000000).toISOString(), overallKnowledgeScore: 6, overallStars: 3 },
];

export const mockImprovementAreas: Record<string, { title: string; type: 'gap' | 'misconception' }[]> = {
  'c1': [
    { title: 'React.memo vs useMemo', type: 'gap' },
    { title: 'useEffect cleanup functions', type: 'misconception' },
    { title: 'Server Components architecture', type: 'gap' }
  ],
  'c2': [
    { title: 'Event Loop phases', type: 'gap' },
    { title: 'Memory leak debugging', type: 'gap' }
  ]
};
