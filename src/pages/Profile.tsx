import { Flex, Text, Stack, Box, Avatar } from '@chakra-ui/react';
import Image, { Shimmer } from 'react-shimmer';
import { useParams } from 'react-router-dom';

import { MainLayout } from '../components/layouts/MainLayout';
import { Card } from '../components/Card';
import { ProfileItem } from '../components/ProfileItem';
import { MissionEntry } from '../components/MissionEntry';
import { ShortcutPanel } from '../components/sections/ShortcutPanel';

export const Profile = () => {
  let { username } = useParams<{ username?: string }>();
  let isCurrentUser = !username;
  return (
    <MainLayout>
      <Card position="relative" width="100%" p="0">
        <Flex direction="column">
          <Box height="240px" width="100%">
            <Image
              NativeImgProps={{
                style: { width: '100%', height: '100%', objectFit: 'cover' },
              }}
              src="https://source.unsplash.com/collection/404339/800x600"
              fallback={<Shimmer height={240} width={960} />}
            />
          </Box>
          <Avatar
            position="absolute"
            width={200}
            height={200}
            top={170}
            ml="6"
          />
          <Flex p="6" pl={230} minH={150}>
            <Stack ml="6" spacing="1">
              <Stack direction="row" align="baseline">
                <Text fontSize="2xl" fontWeight="bold">
                  {isCurrentUser ? '当前用户' : username}
                </Text>
                <Box color="gray.500">
                  <ProfileItem
                    label="个人介绍"
                    value="这个人很懒，什么也没留下～"
                    isEditable={isCurrentUser}
                    hideLabel
                  />
                </Box>
              </Stack>
              <ProfileItem
                label="城市"
                value="北京"
                isEditable={isCurrentUser}
              />

              <ProfileItem
                label="手机"
                value="12233344556"
                isEditable={isCurrentUser}
              />
            </Stack>
          </Flex>
        </Flex>
      </Card>
      <Flex width="100%" justify="space-between" mt={2} zIndex={1}>
        <Box width="100%" flex={7} mr={1}>
          <Stack>
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
};
