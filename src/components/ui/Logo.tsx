import { HStack, ImageProps, Text } from '@chakra-ui/react';
import { IconBaseProps } from 'react-icons';
import { FaAngellist } from 'react-icons/fa';

export const Logo: React.FC<IconBaseProps> = (props: IconBaseProps) => (
  <FaAngellist {...props} />
);

export const LogoExpanded = (props: ImageProps) => (
  <HStack spacing="0">
    <Logo size={32} />
    <Text as="h1" fontSize="2xl">
      HEY
    </Text>
  </HStack>
);
