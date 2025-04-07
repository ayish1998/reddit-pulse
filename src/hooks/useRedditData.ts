import { useCallback } from 'react';
import { usePostContext } from '@devvit/public-api';
import { formatDate } from '../utils/formatting.js';

export function useRedditData() {
  const context = usePostContext();
  
  /**
   * Get information about the current subreddit
   */
  const getSubredditInfo = useCallback(async () => {
    const { reddit } = context;
    try {
      const subreddit = await reddit.getCurrentSubreddit();
      return {
        name: subreddit.name,
        displayName: subreddit.displayName,
        subscribers: subreddit.subscribers,
        created: subreddit.created,
        description: subreddit.description,
        over18: subreddit.over18,
      };
    } catch (error) {
      console.error('Failed to get subreddit info:', error);
      return {
        name: 'Unknown',
        displayName: 'Unknown Subreddit',
        subscribers: 0,
        created: new Date(),
        description: '',
        over18: false,
      };
    }
  }, [context]);
  
  /**
   * Get engagement data for a specific time range
   */
  const getEngagementData = useCallback(async (timeRange: '7d' | '30d' | '90d') => {
    const { storage } = context;
    
    try {
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      
      // Create date keys for the past N days
      const dateKeys = [];
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dateKeys.push(date.toISOString().split('T')[0]);
      }
      
      // Fetch data for each day from storage
      const engagementData = await Promise.all(
        dateKeys.map(async (dateKey) => {
          const data = await storage.get(`engagement:${dateKey}`);
          return {
            date: dateKey,
            label: formatDate(dateKey),
            activeUsers: (data?.activeUsers || 0),
            qualifiedEngagers: Math.floor((data?.activeUsers || 0) * 0.7), // This would be real data
          };
        })
      );
      
      // Sort by date (oldest to newest)
      return engagementData.sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
      console.error('Failed to get engagement data:', error);
      return [];
    }
  }, [context]);
  
  /**
   * Get the current stats (latest day)
   */
  const getCurrentStats = useCallback(async () => {
    const { storage } = context;
    
    try {
      // Get today's date
      const today = new Date().toISOString().split('T')[0];
      
      // Get stats for today or create placeholder
      const stats = await storage.get(`engagement:${today}`) || {
        activeUsers: 0,
        qualifiedEngagers: 0,
        fundingTier: 0,
      };
      
      // Calculate funding tier based on qualified engagers
      let fundingTier = 0;
      let cumulativePayout = 0;
      
      const tiers = [
        { threshold: 500, payout: 500 },
        { threshold: 1000, payout: 1000 },
        { threshold: 10000, payout: 5000 },
        { threshold: 50000, payout: 10000 },
        { threshold: 250000, payout: 25000 },
        { threshold: 1000000, payout: 75000 },
      ];
      
      for (let i = 0; i < tiers.length; i++) {
        if ((stats.qualifiedEngagers || 0) >= tiers[i].threshold) {
          fundingTier = i + 1;
          cumulativePayout += tiers[i].payout;
        } else {
          break;
        }
      }
      
      return {
        ...stats,
        fundingTier,
        cumulativePayout,
      };
    } catch (error) {
      console.error('Failed to get current stats:', error);
      return {
        activeUsers: 0,
        qualifiedEngagers: 0,
        fundingTier: 0,
        cumulativePayout: 0,
      };
    }
  }, [context]);
  
  /**
   * Create a new poll
   */
  const createPoll = useCallback(async (pollData: {
    title: string;
    options: string[];
    closesAt: Date | null;
  }) => {
    const { storage } = context;
    
    try {
      // Get existing polls or create empty array
      const existingPolls = await storage.get('polls') || [];
      
      // Create new poll
      const newPoll = {
        id: Date.now(),
        title: pollData.title,
        options: pollData.options.map(option => ({ text: option, votes: 0 })),
        createdAt: new Date(),
        closesAt: pollData.closesAt,
        isClosed: false,
        votes: 0,
      };
      
      // Add new poll to the list
      const updatedPolls = [newPoll, ...existingPolls];
      
      // Save updated polls
      await storage.set('polls', updatedPolls);
      
      return newPoll;
    } catch (error) {
      console.error('Failed to create poll:', error);
      throw error;
    }
  }, [context]);
  
  return {
    getSubredditInfo,
    getEngagementData,
    getCurrentStats,
    createPoll,
  };
}