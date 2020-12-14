import { NotFoundLayout } from '../components/layouts/NotFoundLayout';
import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <NotFoundLayout>
    <VStack pt={16} spacing={8}>
      <VStack>
        <Heading as="h1" size="4xl" color="primary.800">
          404
        </Heading>
        <Text>这里什么都没有……</Text>
      </VStack>
      <Link to="/">
        <Button colorScheme="primary">回到首页</Button>
      </Link>
    </VStack>
  </NotFoundLayout>
);
