import { Flex, Text, Stack, Box, Avatar } from "@chakra-ui/react";
import Image, { Shimmer } from "react-shimmer";
import { Redirect, useParams } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { Card } from "../components/Card";
import { ProfileItem } from "../components/ProfileItem";
import { MissionEntry } from "../components/MissionEntry";
import { ShortcutPanel } from "../components/sections/ShortcutPanel";
import { useQuery } from "react-query";
import { UserType } from "./Mission";

export const Profile = () => {
  let { username } = useParams<{ username?: string }>();
  let isCurrentUser = !username;

  const { data: profileData } = useQuery<UserType, any>(`profile`, () =>
    fetch(`/api/profile`, {
      headers: {
        Authorization: "Bearer " + String(localStorage.getItem("accessToken")),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res;
      })
  );

  return localStorage.getItem("accessToken") ? (
    <MainLayout>
      <Card position="relative" width="100%" p="0">
        <Flex direction="column">
          <Box height="240px" width="100%">
            <Image
              NativeImgProps={{
                style: { width: "100%", height: "100%", objectFit: "cover" },
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
                  {profileData?.username}
                </Text>
                <Box color="gray.500">
                  <ProfileItem
                    label="个人介绍"
                    profileKey="description"
                    value={profileData?.description}
                    isEditable={isCurrentUser}
                    hideLabel
                  />
                </Box>
              </Stack>
              <ProfileItem
                label="城市"
                profileKey="city"
                value={profileData?.city}
                isEditable={isCurrentUser}
              />

              <ProfileItem
                label="手机"
                profileKey="phone"
                value={profileData?.phone}
                isEditable={isCurrentUser}
              />
            </Stack>
          </Flex>
        </Flex>
      </Card>
      <Flex width="100%" justify="space-between" mt={2} zIndex={1}>
        <Box width="100%" flex={7} mr={1}>
          <Stack>
            {profileData?.missions.map((mission) => (
              <MissionEntry
                key={mission.missionId}
                title={mission.title}
                type={mission.type}
                description={mission.description}
                owner={profileData?.username}
                link={`/mission/${mission.missionId}`}
              />
            ))}
          </Stack>
        </Box>
        <Box width="100%" flex={3} ml={1}>
          <ShortcutPanel></ShortcutPanel>
        </Box>
      </Flex>
    </MainLayout>
  ) : (
    <Redirect to="/" />
  );
};
