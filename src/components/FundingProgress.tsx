import { useEffect, useState } from 'react';
import { Box, Text, VStack, HStack, ProgressBar, Tooltip } from '@devvit/public-api';
import { useRedditData } from '../hooks/useRedditData';
import { formatNumber } from '../utils/formatting';

// Define the tier thresholds
const TIERS = [
  { tier: 1, threshold: 500, payout: 500 },
  { tier: 2, threshold: 1000, payout: 1000 },
  { tier: 3, threshold: 10000, payout: 5000 },
  { tier: 4, threshold: 50000, payout: 10000 },
  { tier: 5, threshold: 250000, payout: 25000 },
  { tier: 6, threshold: 1000000, payout: 75000 },
];

export function FundingProgress() {
  const { getCurrentStats } = useRedditData();
  const [stats, setStats] = useState<any>(null);
  
  useEffect(() => {
    const loadStats = async () => {
      const currentStats = await getCurrentStats();
      setStats(currentStats);
    };
    
    loadStats();
  }, []);
  
  if (!stats) {
    return (
      <Box backgroundColor="neutralSoft" padding="medium" borderRadius="medium">
        <Text style="heading">Funding Progress</Text>
        <Text>Loading funding data...</Text>
      </Box>
    );
  }
  
  // Calculate current tier and progress
  const { qualifiedEngagers = 0 } = stats;
  
  // Find the highest tier achieved and the next tier
  let currentTier = 0;
  let nextTier = TIERS[0];
  
  for (let i = 0; i < TIERS.length; i++) {
    if (qualifiedEngagers >= TIERS[i].threshold) {
      currentTier = i + 1;
      nextTier = TIERS[i + 1] || TIERS[i];
    } else {
      nextTier = TIERS[i];
      break;
    }
  }
  
  // Calculate progress to next tier
  const prevThreshold = currentTier > 0 ? TIERS[currentTier - 1].threshold : 0;
  const progress = currentTier >= TIERS.length 
    ? 100 
    : ((qualifiedEngagers - prevThreshold) / (nextTier.threshold - prevThreshold)) * 100;
  
  // Calculate total earnings
  const totalEarnings = TIERS
    .filter((t, i) => i < currentTier)
    .reduce((sum, tier) => sum + tier.payout, 0);
  
  return (
    <Box backgroundColor="neutralSoft" padding="medium" borderRadius="medium">
      <Text style="heading">Funding Progress</Text>
      
      <VStack gap="medium" marginTop="medium">
        <HStack alignItems="center" justifyContent="space-between">
          <Text>Current Tier</Text>
          <Text style="heading" color="accent">Tier {currentTier}</Text>
        </HStack>
        
        <HStack alignItems="center" justifyContent="space-between">
          <Text>Daily Qualified Engagers</Text>
          <Text style="heading">{formatNumber(qualifiedEngagers)}</Text>
        </HStack>
        
        <VStack gap="small">
          <HStack alignItems="center" justifyContent="space-between">
            <Text size="small">Progress to Tier {currentTier + 1}</Text>
            <Text>{Math.round(progress)}%</Text>
          </HStack>
          
          <ProgressBar value={progress} max={100} />
          
          <HStack alignItems="center" justifyContent="space-between">
            <Text size="xsmall">{formatNumber(prevThreshold)}</Text>
            <Text size="xsmall">{formatNumber(nextTier.threshold)}</Text>
          </HStack>
        </VStack>
        
        <HStack backgroundColor="neutralInverted" padding="medium" borderRadius="medium" justifyContent="space-between">
          <Text color="textInverted">Estimated Earnings</Text>
          <Text style="heading" color="textInverted">${formatNumber(totalEarnings)}</Text>
        </HStack>
      </VStack>
    </Box>
  );
}