import { Box, chakra } from '@chakra-ui/react';

export const Card = chakra((props) => (
  <Box
    boxShadow="md"
    rounded="md"
    p="6"
    bg="white"
    overflow="hidden"
    {...props}
  />
));
