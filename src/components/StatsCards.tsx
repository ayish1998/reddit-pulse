import { useEffect, useState } from 'react';
import { Box, Text, HStack, VStack, Icon } from '@devvit/public-api';
import { useRedditData } from '../hooks/useRedditData.js';
import { formatNumber } from '../utils/formatting.js';

export function StatsCards() {
  const { getCurrentStats, getSubredditInfo } = useRedditData();
  const [stats, setStats] = useState<any>(null);
  const [subreddit, setSubreddit] = useState<any>(null);
  
  useEffect(() => {
    const loadData = async () => {
      const [currentStats, subredditInfo] = await Promise.all([
        getCurrentStats(),
        getSubredditInfo(),
      ]);
      
      setStats(currentStats);
      setSubreddit(subredditInfo);
    };
    
    loadData();
  }, []);
  
  if (!stats || !subreddit) {
    return (
      <Box backgroundColor="neutralSoft" padding="medium" borderRadius="medium">
        <Text>Loading stats...</Text>
      </Box>
    );
  }
  
  const statCards = [
    {
      title: 'Subscribers',
      value: formatNumber(subreddit.subscribers),
      trend: '+5%', // This would be calculated from real data
      icon: 'Person',
    },
    {
      title: 'Daily Active Users',
      value: formatNumber(stats.activeUsers || 0),
      trend: '+12%',
      icon: 'Activity',
    },
    {
      title: 'Qualified Engagers',
      value: formatNumber(stats.qualifiedEngagers || 0),
      trend: '+8%',
      icon: 'Star',
    },
    {
      title: 'Engagement Rate',
      value: `${((stats.activeUsers / subreddit.subscribers) * 100 || 0).toFixed(1)}%`,
      trend: '+2%',
      icon: 'Trending',
    },
  ];
  
  return (
    <HStack gap="medium" flexWrap="wrap">
      {statCards.map((card, i) => (
        <Box 
          key={i} 
          backgroundColor="neutralSoft" 
          padding="medium" 
          borderRadius="medium"
          width="calc(50% - 8px)" // 2 cards per row on most screens
        >
          <HStack alignItems="center" justifyContent="space-between">
            <VStack>
              <Text size="small" color="textSecondary">{card.title}</Text>
              <Text style="heading">{card.value}</Text>
              <HStack alignItems="center">
                <Text size="small" color="success">{card.trend}</Text>
              </HStack>
            </VStack>
            <Box backgroundColor="neutralInverted" borderRadius="circle" padding="small">
              <Icon name={card.icon} color="textInverted" />
            </Box>
          </HStack>
        </Box>
      ))}
    </HStack>
  );
}