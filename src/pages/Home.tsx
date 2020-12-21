import { MainLayout } from "../components/layouts/MainLayout";
import { MissionEntry } from "../components/MissionEntry";
import { ShortcutPanel } from "../components/sections/ShortcutPanel";
import { Card } from "../components/Card";
import { Box, Flex, Stack, HStack } from "@chakra-ui/react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Select } from "@chakra-ui/react";

import { useQuery } from "react-query";

interface MissionType {
  missionId: string;
  title: string;
  description: string;
  owner: string;
}

export const Home = () => {
  const { data } = useQuery<MissionType[], any>("missions", () =>
    fetch("/api/missions", {
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
  return (
    <MainLayout>
      <Flex width="100%" justify="space-between" mt={2} zIndex={1}>
        <Box width="100%" flex={7} mr={1}>
          <Stack>
            <Card>
              <HStack>
                <Select placeholder="筛选召集令类别">
                  <option value="技术交流">技术交流</option>
                  <option value="学业探讨">学业探讨</option>
                  <option value="社会实践">社会实践</option>
                  <option value="公益志愿者">公益志愿者</option>
                  <option value="游玩">游玩</option>
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
            {data?.map((mission) => (
              <MissionEntry
                key={mission.missionId}
                title={mission.title}
                description={mission.description}
                owner={mission.owner}
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
  );
};
