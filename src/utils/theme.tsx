import { theme } from '@chakra-ui/react';

const heyTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      ...theme.colors.green,
    },
  },
};

export default heyTheme;
