import { useState } from 'react';
import { Box, Text, Button, VStack, HStack, TextInput, TextArea, Spacer, Calendar } from '@devvit/public-api';
import { useRedditData } from '../hooks/useRedditData.js';

export function PollCreator() {
  const { createPoll } = useRedditData();
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const addOption = () => {
    setOptions([...options, '']);
  };
  
  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  
  const removeOption = (index: number) => {
    if (options.length <= 2) return; // Minimum 2 options
    
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };
  
  const handleSubmit = async () => {
    if (!title || options.some(opt => !opt.trim()) || !endDate) {
      return; // Validation failed
    }
    
    setIsSubmitting(true);
    
    try {
      await createPoll({
        title,
        options: options.filter(opt => opt.trim()),
        closesAt: endDate,
      });
      
      // Reset form
      setTitle('');
      setOptions(['', '']);
      setEndDate(null);
      setSuccessMessage('Poll created successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Failed to create poll:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Box backgroundColor="neutralSoft" padding="medium" borderRadius="medium">
      <Text style="heading">Create Community Poll</Text>
      <Text>Engage your community with interactive polls</Text>
      
      <Spacer size="large" />
      
      <VStack gap="medium">
        <VStack gap="small">
          <Text>Poll Question</Text>
          <TextInput 
            value={title}
            onChange={setTitle}
            placeholder="Ask your community a question..."
          />
        </VStack>
        
        <VStack gap="small">
          <Text>Poll Options</Text>
          {options.map((option, index) => (
            <HStack key={index} gap="small" alignItems="center">
              <TextInput 
                value={option}
                onChange={(value) => updateOption(index, value)}
                placeholder={`Option ${index + 1}`}
                style={{ flex: 1 }}
              />
              {options.length > 2 && (
                <Button 
                  icon="Trash" 
                  appearance="subtle"
                  onPress={() => removeOption(index)}
                />
              )}
            </HStack>
          ))}
          
          <Button 
            icon="Plus" 
            onPress={addOption}
            appearance="secondary"
          >
            Add Option
          </Button>
        </VStack>
        
        <VStack gap="small">
          <Text>Poll Duration</Text>
          <Calendar 
            value={endDate} 
            onChange={setEndDate}
            minDate={new Date()} // Can't select dates in the past
          />
        </VStack>
        
        {successMessage && (
          <Box backgroundColor="success" padding="small" borderRadius="medium">
            <Text color="textInverted">{successMessage}</Text>
          </Box>
        )}
        
        <Button 
          onPress={handleSubmit}
          appearance="primary" 
          loading={isSubmitting}
          disabled={!title || options.some(opt => !opt.trim()) || !endDate}
        >
          Create Poll
        </Button>
      </VStack>
    </Box>
  );
}