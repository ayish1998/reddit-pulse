import { useState } from 'react';
import { Box, Text, Tabs, TabItem, VStack, Spacer } from '@devvit/public-api';
import { EngagementChart } from './EngagementChart.js';
import { FundingProgress } from './FundingProgress.js';
import { StatsCards } from './StatsCards.js';
import { PollCreator } from './PollCreator.js';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <Box padding="medium" backgroundColor="neutral">
      <VStack gap="medium">
        <Box backgroundColor="neutralSoft" padding="medium" borderRadius="medium">
          <Text style="heading" color="accent">RedditPulse Dashboard</Text>
          <Text>Track your community's engagement metrics and funding progress</Text>
        </Box>
        
        <Tabs selectedValue={activeTab} onValueChange={setActiveTab}>
          <TabItem label="Overview" value="overview">
            <VStack gap="large" padding="medium">
              <StatsCards />
              <Spacer size="medium" />
              <EngagementChart />
              <Spacer size="medium" />
              <FundingProgress />
            </VStack>
          </TabItem>
          
          <TabItem label="Polls" value="polls">
            <VStack gap="large" padding="medium">
              <PollCreator />
            </VStack>
          </TabItem>
          
          <TabItem label="Settings" value="settings">
            <VStack gap="large" padding="medium">
              <Box backgroundColor="neutralSoft" padding="medium" borderRadius="medium">
                <Text style="heading">Settings</Text>
                <Text>Configure your dashboard preferences</Text>
              </Box>
            </VStack>
          </TabItem>
        </Tabs>
      </VStack>
    </Box>
  );
}