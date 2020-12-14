import { theme } from '@chakra-ui/react';

const heyTheme = {
  ...theme,
  styles: {
    global: {
      body: {
        fontFamily: 'body',
        color: 'gray.800',
        bg: 'gray.50',
        transition: 'background-color 0.2s',
        lineHeight: 'base',
      },
      '*::placeholder': {
        color: 'gray.400',
      },
      '*, *::before, &::after': {
        borderColor: 'gray.200',
        wordWrap: 'break-word',
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
