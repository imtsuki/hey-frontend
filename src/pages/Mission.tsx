import * as R from 'ramda';
import { useParams } from 'react-router-dom';
import { HStack, Box, Stack, Flex } from '@chakra-ui/react';
import { Badge, Tag, Button, IconButton } from '@chakra-ui/react';
import { List, ListItem } from '@chakra-ui/react';
import { Text, Heading } from '@chakra-ui/react';
import { Avatar, AvatarGroup } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

import { MainLayout } from '../components/layouts/MainLayout';
import { ShortcutPanel } from '../components/sections/ShortcutPanel';
import { Card } from '../components/Card';

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
              <HStack>
                <Button lineHeight="1" size="md">
                  修改召集令
                </Button>
                <Button colorScheme="red" lineHeight="1" size="md">
                  删除召集令
                </Button>
              </HStack>
              <Heading as="h2" size="md">
                当前已召集
              </Heading>
              <AvatarGroup size="md" max={2}>
                <Avatar name="Ryan Florence" />
                <Avatar name="Segun Adebayo" />
                <Avatar name="Kent Dodds" />
                <Avatar name="Prosper Otemuyiwa" />
                <Avatar name="Christian Nwamba" />
              </AvatarGroup>
              <Heading as="h2" size="md">
                待处理申请
              </Heading>
              <List spacing={3}>
                {R.repeat(
                  <ListItem>
                    <Stack>
                      <Flex justify="space-between">
                        <Flex>
                          <Avatar />
                          <Box ml="3">
                            <Heading size="md">Tsuki</Heading>
                            <Text fontSize="sm">
                              这个人很懒，什么也没留下～
                            </Text>
                          </Box>
                        </Flex>
                        <HStack>
                          <IconButton
                            variant="outline"
                            isRound
                            colorScheme="green"
                            aria-label="同意申请"
                            icon={<CheckIcon />}
                          />
                          <IconButton
                            variant="outline"
                            isRound
                            colorScheme="red"
                            aria-label="拒绝申请"
                            icon={<CloseIcon />}
                          />
                        </HStack>
                      </Flex>
                      <Text pl="16">
                        这是申请人的申请信息。这是申请人的申请信息。这是申请人的申请信息。这是申请人的申请信息。这是申请人的申请信息。这是申请人的申请信息。
                      </Text>
                    </Stack>
                  </ListItem>,
                  2
                )}
              </List>
              {/* 以下是接令者界面 */}
              <Heading as="h2" size="md">
                我的申请
              </Heading>
              <HStack>
                <Text fontSize="sm" color="gray.500">
                  申请状态
                </Text>
                <Badge colorScheme="purple">待处理</Badge>
                <Badge colorScheme="green">已同意</Badge>
                <Badge colorScheme="red">已拒绝</Badge>
                <Badge>已取消</Badge>
              </HStack>
              <Text>
                这是我的申请信息。这是我的申请信息。这是我的申请信息。这是我的申请信息。这是我的申请信息。这是我的申请信息。这是我的申请信息。这是我的申请信息。
              </Text>
              <Button colorScheme="primary" lineHeight="1" size="md" maxW={200}>
                我要接令
              </Button>
              <HStack>
                <Button lineHeight="1" size="md">
                  修改申请
                </Button>
                <Button colorScheme="red" lineHeight="1" size="md">
                  删除申请
                </Button>
              </HStack>
            </Stack>
          </Card>
        </Box>
        <Stack width="100%" flex={3} ml={1}>
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
          <ShortcutPanel />
        </Stack>
      </Flex>
    </MainLayout>
  );
};
