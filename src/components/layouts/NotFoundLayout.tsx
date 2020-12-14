import { Flex } from '@chakra-ui/react';

export const NotFoundLayout: React.FC = (props) => (
  <Flex
    direction="column"
    align="center"
    height="100%"
    maxW={{ xl: '1200px' }}
    m="0 auto"
  >
    {props.children}
  </Flex>
);
