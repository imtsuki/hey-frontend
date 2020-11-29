import { HStack, ImageProps, Text } from '@chakra-ui/react';
import { FaAngellist } from 'react-icons/fa';

export const Logo = (props: ImageProps) => (
  <HStack spacing="0">
    <FaAngellist size={32} />
    <Text as="h1" fontSize="2xl">
      HEY
    </Text>
  </HStack>
);
