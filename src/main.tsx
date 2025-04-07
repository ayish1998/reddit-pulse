import { Devvit } from '@devvit/public-api';
import { Dashboard } from './components/Dashboard.js';

// Configure Devvit to use the Reddit API
Devvit.configure({
  redditAPI: true,
});

// Add a menu item to open the dashboard
Devvit.addMenuItem({
  label: 'RedditPulse Dashboard',
  location: 'subreddit',
  onPress: async (event, context) => {
    const { ui } = context;
    ui.showModal({
      title: 'RedditPulse Dashboard',
      content: <Dashboard />,
      fullscreen: true,
    });
  },
});

// Register a scheduled job to collect daily engagement data
Devvit.addSchedulerJob({
  name: 'collect-daily-stats',
  schedule: '0 0 * * *', // Run at midnight every day
  onRun: async (event, context) => {
    const { reddit, storage } = context;
    
    try {
      // Get subreddit info
      const subreddit = await reddit.getCurrentSubreddit();
      
      // Get yesterday's stats
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dateKey = yesterday.toISOString().split('T')[0];
      
      // Store the engagement data
      await storage.set(`engagement:${dateKey}`, {
        subscribers: subreddit.subscribers,
        activeUsers: Math.floor(subreddit.subscribers * Math.random() * 0.2), // This would be real data from Reddit API
        date: dateKey,
      });
      
      console.log(`Collected stats for ${dateKey}`);
    } catch (error) {
      console.error('Failed to collect stats:', error);
    }
  },
});

// Export your app
Devvit.export();