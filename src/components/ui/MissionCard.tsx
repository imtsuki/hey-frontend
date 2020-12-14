import { Text, Stack, Heading } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import { Card } from './Card';

export const MissionEntryCard = () => (
  <Card
    role="group"
    transition="linear"
    transitionDuration="0.1s"
    _hover={{
      boxShadow: 'lg',
      cursor: 'pointer',
    }}
  >
    <Stack spacing={2}>
      <Text fontSize="sm" color="gray.500">
        Tsuki · 发布于 3 分钟前
      </Text>
      <Heading size="md">机器人调度系统开发</Heading>
      <Text>
        机器人集群调度系统开发，我公司会提供软件概要设计框架，以及交管算法。外包工程师，按照我们的要求配合完成开发。
        机器人集群调度系统开发，我公司会提供软件概要设计框架，以及交管算法。外包工程师，按照我们的要求配合完成开发。
      </Text>
      <ArrowForwardIcon
        opacity="0"
        _groupHover={{ opacity: 1 }}
        transition="linear"
        transitionDuration="0.1s"
      />
    </Stack>
  </Card>
);
