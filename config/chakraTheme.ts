// Chakra UI specific theme and variables configuration

import { extendTheme } from '@chakra-ui/react';
import MarkerFelt from '../fonts/MarkerFelt.ttf';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        minHeight: '100vh',
        overflowX: 'hidden',
        bgGradient:
          'linear-gradient(90deg, elvenTools.bgStripes 0.1%, elvenTools.dark.base 0.1%, elvenTools.dark.base 50%, elvenTools.bgStripes 50%, elvenTools.bgStripes 50.1%, elvenTools.dark.base 50.1%, elvenTools.dark.base 100%);',
        bgSize: '700px',
        backgroundPositionX: '150px',
        color: 'elvenTools.white',
      },
      '*': {
        '&::-webkit-scrollbar': {
          width: 1.5,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'elvenTools.dark.base',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'elvenTools.light',
          borderRadius: 1.5,
        },
        scrollbarWidth: 'auto',
        scrollbarColor: 'elvenTools.light elvenTools.dark.base',
      },
    },
  },
  fonts: {
    heading: MarkerFelt,
    body: MarkerFelt,
  },
  colors: {
    elvenTools: {
      bgStripes: '#003333',
      shadowColor: '#141414',
      dark: {
        lighter: '#3c4757',
        base: '#003333',
        darker: '#1d222a',
      },
      light: '#FAFFFD',
      white: '#ffffff',
      color1: {
        lighter: '#59a1ea',
        base: '#3C91E6',
        darker: '#1c7bda',
      },
      color2: {
        lighter: '#ff9966',
        base: '#ff6633',
        darker: '#cc6633',
      },
      color3: {
        lighter: '#fb9567',
        base: '#FA824C',
        darker: '#f9611c',
      },
    },
  },
  components: {
    Alert: {
      variants: {
        subtle: {
          container: {
            bg: 'elvenTools.dark.lighter',
          },
        },
      },
    },
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1560px',
  },
});
