import { MainLayout } from '../components/layouts/MainLayout';
import { MissionEntry } from '../components/MissionEntry';
import { ShortcutPanel } from '../components/sections/ShortcutPanel';
import { Card } from '../components/Card';
import { Box, Flex, Stack, HStack } from '@chakra-ui/react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Select } from '@chakra-ui/react';

export const Home = () => (
  <MainLayout>
    <Flex width="100%" justify="space-between" mt={2} zIndex={1}>
      <Box width="100%" flex={7} mr={1}>
        <Stack>
          <Card>
            <HStack>
              <Select placeholder="筛选召集令类别">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input placeholder="关键字搜索" />
              </InputGroup>
            </HStack>
          </Card>
          <MissionEntry></MissionEntry>
          <MissionEntry></MissionEntry>
          <MissionEntry></MissionEntry>
          <MissionEntry></MissionEntry>
          <MissionEntry></MissionEntry>
        </Stack>
      </Box>
      <Box width="100%" flex={3} ml={1}>
        <ShortcutPanel></ShortcutPanel>
      </Box>
    </Flex>
  </MainLayout>
);
