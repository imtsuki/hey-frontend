import { Redirect, useParams } from "react-router-dom";
import { HStack, Box, Stack, Flex, toast, useToast } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "react-query";
import { Badge, Tag, Button, IconButton } from "@chakra-ui/react";
import { List, ListItem } from "@chakra-ui/react";
import { Text, Heading } from "@chakra-ui/react";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { MainLayout } from "../components/layouts/MainLayout";
import { ShortcutPanel } from "../components/sections/ShortcutPanel";
import { Card } from "../components/Card";
import { MissionType } from "./Home";
import { EditMissionShortcut } from "../components/sections/ShortcutPanel";
import { CreateOrEditApplicationShortcut } from "../components/sections/ShortcutPanel";
import { Image } from "@chakra-ui/react";

export interface UserType {
  username: string;
  description: string;
  city: string;
  phone: string;
  missions: MissionType[];
}
export interface AppType {
  id: string;
  apUser: UserType;
  description: string;
  state: string;
  isOwner: boolean;
  mission: MissionType;
}

export const Mission = () => {
  const toast = useToast();
  const { missionId } = useParams<{ missionId: string }>();
  const queryClient = useQueryClient();

  const { data: missionData } = useQuery<MissionType, any>(
    `mission/${missionId}`,
    () =>
      fetch(`/api/mission/${missionId}`, {
        headers: {
          Authorization:
            "Bearer " + String(localStorage.getItem("accessToken")),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          return res;
        })
  );

  const { data: appData } = useQuery<AppType[], any>(
    `${missionId}/applications`,
    () =>
      fetch(`/api/mission/${missionId}/applications`, {
        headers: {
          Authorization:
            "Bearer " + String(localStorage.getItem("accessToken")),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          return res;
        })
  );

  const { data: myAppData } = useQuery<AppType, any>(
    `${missionId}/userappliaction`,
    () =>
      fetch(`/api/user/${missionId}/application`, {
        headers: {
          Authorization:
            "Bearer " + String(localStorage.getItem("accessToken")),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (JSON.stringify(res) == "{}") {
            return undefined;
          }
          return res;
        })
  );

  return localStorage.getItem("accessToken") ? (
    <MainLayout>
      <Flex width="100%" justify="space-between" mt={2} zIndex={1}>
        <Box width="100%" flex={7} mr={1}>
          <Card>
            <Stack spacing={4}>
              <Text fontSize="sm" color="gray.500">
                发布于 3 分钟前
              </Text>
              <Heading>召集令名称 #{missionData?.title}</Heading>
              <HStack>
                <Text fontSize="sm" color="gray.500">
                  召集令类型
                </Text>
                <Tag>{missionData?.type}</Tag>
              </HStack>
              <HStack>
                <Text fontSize="sm" color="gray.500">
                  召集令状态
                </Text>
                {/* <Badge colorScheme="purple">待响应</Badge>
                <Badge colorScheme="green">已完成</Badge>
                <Badge colorScheme="red">已取消</Badge> */}
                <Badge>{missionData?.state}</Badge>
              </HStack>
              <HStack>
                <Text fontSize="sm" color="gray.500">
                  召集人数 <Tag>{missionData?.people}</Tag>
                </Text>
              </HStack>
              <HStack>
                <Text fontSize="sm" color="gray.500">
                  召集结束日期 <Tag>{missionData?.deadline}</Tag>
                </Text>
              </HStack>
              <Heading as="h2" size="md">
                召集令描述
              </Heading>
              <Text>{missionData?.description}</Text>

              <Heading as="h2" size="md">
                召集令图片
              </Heading>
              {/* <img src={missionData?.picture} /> */}
              <Image
                objectFit="cover"
                src={missionData?.picture}
                alt={missionData?.title}
              />
              {missionData?.isOwner && missionData.applications?.length == 0 ? (
                <div>
                  <HStack>
                    {/* <Button lineHeight="1" size="md">
                      修改召集令
                    </Button> */}
                    <EditMissionShortcut
                      missionId={missionData?.missionId}
                      missionTitle={missionData?.title}
                      missionType={missionData?.type}
                      missionPeople={missionData?.people}
                      missionDescription={missionData?.description}
                    />
                    {/* <Button colorScheme="red" lineHeight="1" size="md">
                      删除召集令
                    </Button> */}
                  </HStack>
                </div>
              ) : null}
              {appData &&
              appData.length > 0 &&
              appData.filter((x) => x.state == "同意").length > 0 ? (
                <div>
                  <Heading as="h2" size="md">
                    当前已召集
                  </Heading>
                  <AvatarGroup size="md" max={2}>
                    {/* <Avatar name="Ryan Florence" />
                <Avatar name="Segun Adebayo" />
                <Avatar name="Kent Dodds" />
                <Avatar name="Prosper Otemuyiwa" />
                <Avatar name="Christian Nwamba" /> */}
                    {appData
                      .filter((x) => x.state == "同意")
                      .map((x) => (
                        <div>
                          <Avatar
                            key={x.apUser.username}
                            name={x.apUser.username}
                          />
                          <Text>{x.apUser.username}</Text>
                        </div>
                      ))}
                  </AvatarGroup>
                </div>
              ) : null}
              {missionData?.isOwner &&
              appData &&
              appData.filter((x) => x.state == "待处理").length > 0 ? (
                <div>
                  <Heading as="h2" size="md">
                    待处理申请
                  </Heading>
                  <List spacing={3}>
                    {appData
                      ?.filter((x) => x.state == "待处理")
                      .map((x) => (
                        <ListItem key={x.id}>
                          <Stack>
                            <Flex justify="space-between">
                              <Flex>
                                <Avatar />
                                <Box ml="3">
                                  <Heading size="md">
                                    {x.apUser.username}
                                  </Heading>
                                  <Text fontSize="sm">
                                    {x.apUser.description}
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
                                  onClick={() => {
                                    fetch(
                                      `/api/mission/application/${x.id}/accept`,
                                      {
                                        method: "POST",
                                        headers: {
                                          Authorization:
                                            "Bearer " +
                                            String(
                                              localStorage.getItem(
                                                "accessToken"
                                              )
                                            ),
                                        },
                                      }
                                    )
                                      .then((res) => {
                                        if (res.ok) {
                                          return res.json();
                                        } else {
                                          toast({ title: "接受失败" });
                                        }
                                      })
                                      .then((res) => {
                                        toast({ title: "接受成功" });
                                        queryClient.invalidateQueries(
                                          `${missionId}/applications`
                                        );
                                        console.log(res);
                                      })
                                      .catch((err) => {
                                        toast({
                                          title: "接受失败",
                                          description: err.message,
                                        });
                                      });
                                  }}
                                />
                                <IconButton
                                  variant="outline"
                                  isRound
                                  colorScheme="red"
                                  aria-label="拒绝申请"
                                  icon={<CloseIcon />}
                                  onClick={() => {
                                    fetch(
                                      `/api/mission/application/${x.id}/decline`,
                                      {
                                        method: "POST",
                                        headers: {
                                          Authorization:
                                            "Bearer " +
                                            String(
                                              localStorage.getItem(
                                                "accessToken"
                                              )
                                            ),
                                        },
                                      }
                                    )
                                      .then((res) => {
                                        if (res.ok) {
                                          return res.json();
                                        } else {
                                          toast({ title: "拒绝失败" });
                                        }
                                      })
                                      .then((res) => {
                                        toast({ title: "拒绝成功" });
                                        queryClient.invalidateQueries(
                                          `${missionId}/applications`
                                        );
                                        console.log(res);
                                      })
                                      .catch((err) => {
                                        toast({
                                          title: "拒绝失败",
                                          description: err.message,
                                        });
                                      });
                                  }}
                                />
                              </HStack>
                            </Flex>
                            <Text pl="16">{x.description}</Text>
                          </Stack>
                        </ListItem>
                      ))}
                  </List>
                </div>
              ) : null}

              {/* 以下是接令者界面 */}
              {missionData &&
              !missionData.isOwner &&
              missionData.state == "待响应" ? (
                <div>
                  {myAppData ? (
                    <div>
                      <Heading as="h2" size="md">
                        我的申请
                      </Heading>
                      <HStack>
                        <Text fontSize="sm" color="gray.500">
                          申请状态
                        </Text>
                        <Badge>{myAppData.state}</Badge>
                      </HStack>
                      <Text>{myAppData.description}</Text>
                      {myAppData.state == "待处理" ? (
                        <div>
                          <HStack>
                            {/* <Button lineHeight="1" size="md">
                              修改申请
                            </Button> */}

                            <CreateOrEditApplicationShortcut
                              isEditing={true}
                              missionId={missionData.missionId}
                              applicationId={myAppData.id}
                              description={myAppData.description}
                            />
                            <Button
                              colorScheme="red"
                              lineHeight="1"
                              size="md"
                              onClick={() => {
                                fetch(
                                  `/api/mission/${missionData.missionId}/application/${myAppData.id}`,
                                  {
                                    method: "DELETE",
                                    headers: {
                                      Authorization:
                                        "Bearer " +
                                        String(
                                          localStorage.getItem("accessToken")
                                        ),
                                    },
                                  }
                                )
                                  .then((res) => {
                                    if (res.ok) {
                                      return res.json();
                                    } else {
                                      toast({ title: "删除失败" });
                                    }
                                  })
                                  .then((res) => {
                                    toast({ title: "删除成功" });
                                    queryClient.invalidateQueries(
                                      `${missionId}/userappliaction`
                                    );
                                    console.log(res);
                                  })
                                  .catch((err) => {
                                    toast({
                                      title: "删除失败",
                                      description: err.message,
                                    });
                                  });
                              }}
                            >
                              删除申请
                            </Button>
                          </HStack>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  <br />
                  {!myAppData && missionData ? (
                    <div>
                      {/* <Button
                        colorScheme="primary"
                        lineHeight="1"
                        size="md"
                        maxW={200}
                      >
                        我要接令
                      </Button> */}
                      <CreateOrEditApplicationShortcut
                        missionId={missionData?.missionId}
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}
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
                  <Heading size="md">{missionData?.owner?.username}</Heading>
                  <Text fontSize="sm">{missionData?.owner?.description}</Text>
                </Box>
              </Flex>
            </Stack>
          </Card>
          <ShortcutPanel />
        </Stack>
      </Flex>
    </MainLayout>
  ) : (
    <Redirect to="/" />
  );
};
