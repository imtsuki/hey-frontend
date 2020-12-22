import * as React from "react";

import { Link } from "react-router-dom";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { LogoExpanded } from "../ui/Logo";

import { MdClose, MdMenu } from "react-icons/md";

interface MenuItemsProps {
  to: string;
  isLast?: boolean;
  children?: React.ReactNode;
}

const MenuItems: React.FC<MenuItemsProps> = (props: MenuItemsProps) => {
  const { children, isLast, to = "/", ...rest } = props;
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <Link to={to}>{children}</Link>
    </Text>
  );
};

export const LandingHeader: React.FC = (props) => {
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      <Flex align="center">
        <Link to="/">
          <LogoExpanded
            w="100px"
            color={["white", "white", "primary.500", "primary.500"]}
          />
        </Link>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
        {show ? <MdClose /> : <MdMenu />}
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align={["center", "center", "center", "center"]}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItems to="/home">大厅</MenuItems>
          <MenuItems to="/login">登录</MenuItems>
          <MenuItems to="/signup" isLast>
            <Button
              size="sm"
              rounded="md"
              color={["primary.500", "primary.500", "white", "white"]}
              bg={["white", "white", "primary.500", "primary.500"]}
              _hover={{
                bg: [
                  "primary.100",
                  "primary.100",
                  "primary.600",
                  "primary.600",
                ],
              }}
            >
              注册
            </Button>
          </MenuItems>
        </Flex>
      </Box>
    </Flex>
  );
};
