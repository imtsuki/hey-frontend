import * as React from 'react';
import { Flex } from '@chakra-ui/react';
import { LandingHeader } from '../sections/LandingHeader';

export const LandingLayout: React.FC = (props) => (
  <Flex
    direction="column"
    align="center"
    maxW={{ xl: '1200px' }}
    m="0 auto"
    {...props}
  >
    <LandingHeader />
    {props.children}
  </Flex>
);
