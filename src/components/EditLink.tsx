import * as React from 'react';
import { chakra, Icon, Stack, Link } from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';

export const EditLink: React.FC<{
  onClick?: () => void;
}> = ({ onClick }) => {
  return (
    <Link onClick={onClick} isExternal>
      <Stack
        display="inline-flex"
        direction="row"
        spacing={1}
        align="center"
        opacity={0.7}
      >
        <Icon as={FaEdit} color="gray.800" />
      </Stack>
    </Link>
  );
};
