import { MainLayout } from '../components/layouts/MainLayout';
import { MissionEntryCard } from '../components/ui/MissionCard';
import { Card } from '../components/ui/Card';
import { Box, Flex, Stack } from '@chakra-ui/react';

export const Home = () => (
  <MainLayout>
    <Flex width="100%" justify="space-between" mt={2} zIndex={1}>
      <Box width="100%" flex={7} mr={1}>
        <Stack>
          <MissionEntryCard></MissionEntryCard>
          <MissionEntryCard></MissionEntryCard>
          <MissionEntryCard></MissionEntryCard>
          <MissionEntryCard></MissionEntryCard>
          <MissionEntryCard></MissionEntryCard>
        </Stack>
      </Box>
      <Box width="100%" flex={3} ml={1}>
        <Card width="100%"></Card>
      </Box>
    </Flex>
  </MainLayout>
);
