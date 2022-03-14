export const theme = {
  colors: {
    brand: {
      '50': '#dff1ff',
      '100': '#b1d1ff',
      '200': '#81b2fd',
      '300': '#5194f9',
      '400': '#2275f6',
      '500': '#095cdd',
      '600': '#0147ad',
      '700': '#00337d',
      '800': '#001f4e',
      '900': '#000a20',
    },
    gray: {
      '50': '#f1f3fb',
      '100': '#d3d5dc',
      '200': '#b6b8be',
      '300': '#9a9ba1',
      '400': '#7f8084',
      '500': '#656669',
      '600': '#4c4c4f',
      '700': '#343536',
      '800': '#1e1e1f',
      '900': '#030304',
    },
  },
  fonts: {
    body: 'Noto Sans KR',
    heading: 'Noto Sans KR',
    mono: 'Noto Sans KR',
  },
  styles: {
    global: function (_ref: any) {
      // const colorMode = _ref.colorMode
      return {
        body: {
          userSelect: 'none',
          fontSize: '14px',
          // bg: colorMode === "dark" ? "gray.800" : "gray.50",
        },
        _focusVisible: {
          // boxShadow: '0 0 0 3px #d8b2ff !important',
        },
      }
    },
  },
  fontSizes: {},
  fontWeights: {},
  lineHeights: {},
  letterSpacings: {},
  components: {
    Alert: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md',
        colorScheme: 'brand',
      },
    },
    Badge: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md',
        colorScheme: 'brand',
      },
    },
    Box: {
      baseStyle: {
        fontSize: '14px',
        backgroundColor: 'yellow',
      },
    },
    Button: {
      baseStyle: {},
      sizes: {
        md: {
          fontSize: '14px',
          fontWeight: 500,
        },
      },
      variants: {},
      defaultProps: {
        size: 'md',
        colorScheme: 'brand',
      },
    },
    Checkbox: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md',
        colorScheme: 'brand',
      },
    },
    Heading: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md',
        colorScheme: 'brand',
      },
    },
    Input: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md',
        colorScheme: 'brand',
      },
    },
    Popover: {
      baseStyle: {
        popper: {
          // backgroundColor: 'red',
          border: '1px solid rgba(0,0,0,0)',
          boxShadow: '0 3px 6px 0 rgb(0, 0 ,0, 0.16)',
        },
      },
      sizes: {},
      variants: {},
    },
    Spinner: {
      baseStyle: {
        color: 'brand.300',
      },
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md',
      },
    },
    Tabs: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md',
        colorScheme: 'brand',
      },
    },
    Tag: {
      baseStyle: {},
      sizes: {},
      variants: {},
      defaultProps: {
        size: 'md',
        colorScheme: 'brand',
      },
    },
  },
}
