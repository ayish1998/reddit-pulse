import { useEffect, useState } from 'react';
import { Box, Text, Spacer, HStack, VStack, Dropdown } from '@devvit/public-api';
import { useRedditData } from '../hooks/useRedditData.js';
import { formatNumber } from '../utils/formatting.js';

export function EngagementChart() {
  const { getEngagementData } = useRedditData();
  const [timeRange, setTimeRange] = useState('7d');
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      const data = await getEngagementData(timeRange);
      setChartData(data);
    };
    
    loadData();
  }, [timeRange]);
  
  // Calculate height for each bar based on data
  const maxEngagement = Math.max(...chartData.map(d => d.activeUsers), 100);
  
  return (
    <Box backgroundColor="neutralSoft" padding="medium" borderRadius="medium">
      <HStack alignItems="center" justifyContent="space-between">
        <Text style="heading">Community Engagement</Text>
        <Dropdown
          value={timeRange}
          onChange={setTimeRange}
          options={[
            { label: 'Last 7 days', value: '7d' },
            { label: 'Last 30 days', value: '30d' },
            { label: 'Last 90 days', value: '90d' },
          ]}
        />
      </HStack>
      
      <Spacer size="medium" />
      
      <Box height="200px">
        {chartData.length === 0 ? (
          <Text alignment="center">Loading chart data...</Text>
        ) : (
          <HStack height="100%" gap="small" alignItems="flex-end">
            {chartData.map((day, i) => (
              <VStack key={i} flex={1} height="100%" alignItems="center">
                <Box 
                  backgroundColor="accent" 
                  width="100%" 
                  height={`${(day.activeUsers / maxEngagement) * 100}%`}
                  borderRadius="small"
                />
                <Text size="xsmall">{day.label}</Text>
              </VStack>
            ))}
          </HStack>
        )}
      </Box>
      
      <Spacer size="medium" />
      
      <HStack gap="large">
        <VStack>
          <Text size="small" color="textSecondary">Avg. Daily Active Users</Text>
          <Text style="heading">{formatNumber(chartData.reduce((acc, d) => acc + d.activeUsers, 0) / (chartData.length || 1))}</Text>
        </VStack>
        
        <VStack>
          <Text size="small" color="textSecondary">Qualified Engagers</Text>
          <Text style="heading">{formatNumber(chartData.reduce((acc, d) => acc + d.qualifiedEngagers, 0) / (chartData.length || 1))}</Text>
        </VStack>
      </HStack>
    </Box>
  );
}