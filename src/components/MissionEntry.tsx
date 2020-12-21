import { Text, Stack, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import { Card } from "./Card";
import { Link } from "react-router-dom";

export interface MissionEntryProps {
  title?: string;
  description?: string;
  owner?: string;
  link?: string;
}

export const MissionEntry: React.FC<MissionEntryProps> = ({
  title = "机器人调度系统开发",
  description = "机器人集群调度系统开发，我公司会提供软件概要设计框架，以及交管算法。外包工程师，按照我们的要求配合完成开发。机器人集群调度系统开发，我公司会提供软件概要设计框架，以及交管算法。外包工程师，按照我们的要求配合完成开发。",
  owner = "Tsuki",
  link = "/mission/1234",
}) => (
  <Link to={link}>
    <Card
      role="group"
      transition="linear"
      transitionDuration="0.1s"
      _hover={{
        boxShadow: "lg",
      }}
    >
      <Stack spacing={2}>
        <Text fontSize="sm" color="gray.500">
          {owner} · 发布
        </Text>
        <Heading size="md">{title}</Heading>
        <Text>{description}</Text>
        <ArrowForwardIcon
          opacity="0"
          _groupHover={{ opacity: 1 }}
          transition="linear"
          transitionDuration="0.1s"
        />
      </Stack>
    </Card>
  </Link>
);
