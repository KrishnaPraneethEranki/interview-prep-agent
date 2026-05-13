'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PrepSession } from '@/types';
import { getMasteryLabel } from '@/lib/utils/rating';
import { Star, StarHalf, ArrowRight, Calendar, Search } from 'lucide-react';

interface SessionHistoryClientProps {
  initialSessions: PrepSession[];
}

export function SessionHistoryClient({ initialSessions }: SessionHistoryClientProps) {
  const [trackFilter, setTrackFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Extract unique tracks and categories for the filter dropdowns
  const uniqueTracks = useMemo(() => Array.from(new Set(initialSessions.map(s => s.trackId))), [initialSessions]);
  const uniqueCategories = useMemo(() => Array.from(new Set(initialSessions.map(s => s.categoryId))), [initialSessions]);

  const filteredSessions = useMemo(() => {
    return initialSessions.filter(session => {
      const matchTrack = trackFilter === 'all' || session.trackId === trackFilter;
      const matchCategory = categoryFilter === 'all' || session.categoryId === categoryFilter;
      return matchTrack && matchCategory;
    });
  }, [initialSessions, trackFilter, categoryFilter]);

  const renderStars = (stars: number = 0) => {
    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 !== 0;

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-500 text-yellow-500" />}
      </div>
    );
  };

  const getMasteryColor = (score: number) => {
    if (score >= 9) return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
    if (score >= 7) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    if (score >= 5) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    if (score >= 3) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label htmlFor="trackFilter" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
            Filter by Track
          </label>
          <select 
            id="trackFilter"
            value={trackFilter} 
            onChange={(e) => setTrackFilter(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          >
            <option value="all">All Tracks</option>
            {uniqueTracks.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        
        <div className="flex-1 w-full">
          <label htmlFor="categoryFilter" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
            Filter by Category
          </label>
          <select 
            id="categoryFilter"
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          >
            <option value="all">All Categories</option>
            {uniqueCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Results List */}
      {filteredSessions.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No sessions found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or completing a new session.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
              <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 uppercase text-xs font-semibold border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Track / Category</th>
                  <th className="px-6 py-4">Score</th>
                  <th className="px-6 py-4">Mastery</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSessions.map((session) => {
                  const score = session.overallKnowledgeScore || 0;
                  return (
                    <tr key={session.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 font-medium">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(session.startedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 dark:text-white">{session.categoryId}</span>
                          <span className="text-xs text-gray-500">{session.trackId}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 dark:text-white">{score.toFixed(1)}/10</span>
                          {renderStars(session.overallStars)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${getMasteryColor(score)}`}>
                          {getMasteryLabel(score)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link 
                          href={`/sessions/${session.id}/summary`}
                          className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
