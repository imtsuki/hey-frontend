import { MainLayout } from '../components/layouts/MainLayout';
import { Card } from '../components/ui/Card';
import {
  HStack,
  Badge,
  Tag,
  Heading,
  Text,
  Box,
  Flex,
  Stack,
  Avatar,
  Button,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export const Mission = () => {
  let { missionId } = useParams<{ missionId: string }>();
  return (
    <MainLayout>
      <Flex width="100%" justify="space-between" mt={2} zIndex={1}>
        <Box width="100%" flex={7} mr={1}>
          <Card>
            <Stack spacing={4}>
              <Text fontSize="sm" color="gray.500">
                发布于 3 分钟前
              </Text>
              <Heading>召集令名称 #{missionId}</Heading>
              <HStack>
                <Text fontSize="sm" color="gray.500">
                  召集令类型
                </Text>
                <Tag>技术交流</Tag>
                <Tag>学业探讨</Tag>
                <Tag>社会实践</Tag>
                <Tag>公益志愿者</Tag>
                <Tag>游玩</Tag>
              </HStack>
              <HStack>
                <Text fontSize="sm" color="gray.500">
                  召集令状态
                </Text>
                <Badge colorScheme="purple">待响应</Badge>
                <Badge colorScheme="green">已完成</Badge>
                <Badge colorScheme="red">已取消</Badge>
                <Badge>到期未达成</Badge>
              </HStack>
              <HStack>
                <Text fontSize="sm" color="gray.500">
                  召集人数
                </Text>
              </HStack>
              <HStack>
                <Text fontSize="sm" color="gray.500">
                  召集结束日期
                </Text>
              </HStack>
              <Heading as="h2" size="md">
                召集令描述
              </Heading>
              <Text>
                机器人集群调度系统开发，我公司会提供软件概要设计框架，以及交管算法。外包工程师，按照我们的要求配合完成开发。
                机器人集群调度系统开发，我公司会提供软件概要设计框架，以及交管算法。外包工程师，按照我们的要求配合完成开发。
              </Text>
              <Button colorScheme="primary" lineHeight="1" size="md" maxW={240}>
                立即报名
              </Button>
            </Stack>
          </Card>
        </Box>
        <Box width="100%" flex={3} ml={1}>
          <Card width="100%" pt={6} pb={6} pl={4} pr={4}>
            <Stack spacing={4}>
              <Heading size="sm">关于发布者</Heading>
              <Flex>
                <Avatar />
                <Box ml="3">
                  <Heading size="md">Segun Adebayo</Heading>
                  <Text fontSize="sm">这个人很懒，什么也没留下～</Text>
                </Box>
              </Flex>
            </Stack>
          </Card>
        </Box>
      </Flex>
    </MainLayout>
  );
};
