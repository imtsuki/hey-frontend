import { theme } from '@chakra-ui/react';

const heyTheme = {
  ...theme,
  styles: {
    global: {
      body: {
        backgroundColor: 'gray.50',
      },
    },
  },
  colors: {
    ...theme.colors,
    primary: {
      ...theme.colors.green,
    },
  },
};

export default heyTheme;
