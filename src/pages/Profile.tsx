import { MainLayout } from '../components/layouts/MainLayout';
import { Card } from '../components/ui/Card';
import { Flex, Text, Stack, Box, Avatar } from '@chakra-ui/react';
import { MissionCard } from '../components/ui/MissionCard';
import Image, { Shimmer } from 'react-shimmer';

export const Profile = () => {
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
                  Tsuki
                </Text>
                <Text fontSize="lg" color="gray.500">
                  这个人很懒，什么也没留下～
                </Text>
              </Stack>

              <Text fontSize="sm">城市: 北京</Text>
              <Text fontSize="sm">手机号: 13355011223</Text>
            </Stack>
          </Flex>
        </Flex>
      </Card>
      <Flex width="100%" justify="space-between" mt={2} zIndex={1}>
        <Box width="100%" flex={3} mr={1}>
          <Stack>
            <MissionCard></MissionCard>
            <MissionCard></MissionCard>
            <MissionCard></MissionCard>
            <MissionCard></MissionCard>
            <MissionCard></MissionCard>
          </Stack>
        </Box>
        <Box width="100%" flex={1} ml={1}>
          <Card width="100%"></Card>
        </Box>
      </Flex>
    </MainLayout>
  );
};
