import { Flex } from '@chakra-ui/react';
import * as React from 'react';
import { Header } from '../sections/Header';

export const MainLayout: React.FC = (props) => (
  <Flex
    direction="column"
    align="center"
    maxW={{ lg: '960px' }}
    m="0 auto"
    {...props}
  >
    <Header />
    {props.children}
  </Flex>
);
