import { Flex } from '@chakra-ui/react';

export const AuthLayout: React.FC = (props) => (
  <Flex direction="column" align="center" maxW={{ xl: '1200px' }} m="0 auto">
    {props.children}
  </Flex>
);
