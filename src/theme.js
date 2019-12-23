export default (customTheme = {}) => {
  const colors = Object.assign(
    {
      default: '#494D55',
      black: '#1B202B',
      white: '#FFFFFF',
      colorFocus: '#CADCFF',

      greyLightest: '#F8F8F9',
      greyLighter: '#F4F4F4',
      greyLight: '#E8E9EA',
      grey: '#D1D2D5',
      greyDark: '#A4A6AA',
      greyDarker: '#767980',
      greyDarkest: '#494D55',

      primaryLightest: '#CADCFF',
      primaryLight: '#226EFF',
      primary: '#0958F3',
      primaryDark: '#0046CE',

      secondaryLightest: '#DDF5ED',
      secondaryLight: '#42C79B',
      secondary: '#21B986',
      secondaryDark: '#00AC74',

      redLightest: '#FFD7D8',
      redLight: '#FE7B7E',
      red: '#FD575D',
      redDark: '#F23338',

      purpleLightest: '#EBDCFC',
      purpleLight: '#BB8AF6',
      purple: '#A262F0',
      purpleDark: '#8B3FE7',

      orangeLightest: '#FFE6D4',
      orangeLight: '#FFAA70',
      orange: '#FF954D',
      orangeDark: '#EE7523',

      yellowLightest: '#FFF6D6',
      yellowLight: '#FFE075',
      yellow: '#FED23D',
      yellowDark: '#F1BC0B',

      blueLightest: '#CADCFF',
      blueLight: '#4D89FF',
      blue: '#226EFF',
      blueDark: '#0958F3',

      greenLightest: '#DDF5ED',
      greenLight: '#42C79B',
      green: '#21B986',
      greenDark: '#00AC74',
    },
    customTheme.colors
  );

  const buttonVariants = {
    primary: {
      backgroundColor: colors.primary,
      color: colors.white,
      '&:hover': {
        backgroundColor: colors.primaryLight,
      },
      '&:active': {
        backgroundColor: colors.primaryDark,
      },
      '&:disabled': {
        backgroundColor: colors.primaryLightest,
      },
    },
    primaryText: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: colors.primary,
      '&:hover': {
        color: colors.primaryDark,
      },
    },
    secondary: {
      backgroundColor: colors.white,
      borderColor: colors.primary,
      color: colors.primary,
      '&:hover': {
        backgroundColor: colors.primary,
        color: colors.white,
      },
      '&:active': {
        backgroundColor: colors.primaryDark,
        color: colors.white,
      },
      '&:disabled': {
        borderColor: colors.primaryLightest,
        color: colors.primaryLightest,
      },
    },
    grey: {
      backgroundColor: colors.white,
      borderColor: colors.grey,
      color: colors.greyDarkest,
      '&:hover': {
        borderColor: colors.greyDark,
      },
      '&:active': {
        backgroundColor: colors.greyLight,
      },
      '&:disabled': {
        borderColor: colors.grey,
        color: colors.grey,
      },
    },
    greyText: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: colors.grey,
      '&:hover': {
        color: colors.greyDark,
      },
    },
    success: {
      color: colors.white,
      backgroundColor: colors.secondary,
      '&:hover': {
        backgroundColor: colors.secondaryLight,
      },
      '&:active': {
        backgroundColor: colors.secondaryDark,
      },
      '&:disabled': {
        backgroundColor: colors.secondaryLightest,
      },
    },
    warning: {
      backgroundColor: colors.orange,
      color: colors.white,
      '&:hover': {
        backgroundColor: colors.orangeLight,
      },
      '&:active': {
        backgroundColor: colors.orangeDark,
      },
      '&:disabled': {
        backgroundColor: colors.orangeLightest,
      },
    },
    danger: {
      backgroundColor: colors.red,
      color: colors.white,
      '&:hover': {
        backgroundColor: colors.redLight,
      },
      '&:active': {
        backgroundColor: colors.redDark,
      },
      '&:disabled': {
        backgroundColor: colors.redLightest,
      },
    },
    info: {
      backgroundColor: colors.blue,
      color: colors.white,
    },
  };

  const badgeVariants = {
    primary: {
      backgroundColor: colors.primaryLightest,
      color: colors.primaryDark,
    },
    success: {
      backgroundColor: colors.greenLightest,
      color: colors.greenDark,
    },
    danger: {
      backgroundColor: colors.redLightest,
      color: colors.redDark,
    },
    warning: {
      backgroundColor: colors.orangeLightest,
      color: colors.orangeDark,
    },
    info: {
      backgroundColor: colors.blueLightest,
      color: colors.blueDark,
    },
    grey: {
      backgroundColor: colors.greyLight,
      color: colors.greyDarker,
    },
  };

  const alertVariants = badgeVariants;

  const breakpoints = customTheme.breakpoints || ['400px', '600px', '900px', '1200px', '1500px'];
  /* eslint-disable prefer-destructuring */
  breakpoints.xs = breakpoints[0];
  breakpoints.sm = breakpoints[1];
  breakpoints.md = breakpoints[2];
  breakpoints.lg = breakpoints[3];
  breakpoints.xl = breakpoints[4];
  /* eslint-enable prefer-destructuring */

  return {
    classPrefix: 're',
    colors,
    space: [0, 4, 8, 16, 24, 32, 64, 126, 256],

    breakpoints,
    gridWidth: 1200,
    gridGutter: 16,
    gridColumns: 12,

    radii: [0, 2, 4, 8],
    radius: 8,

    shadow: {
      soft: '0px 2px 16px rgba(27, 32, 43, 0.1)',
      hard: '0px 0px 16px rgba(44, 53, 71, 0.2)',
    },

    typography: {
      fontSize: 16,
      color: colors.black,
      bodyFontFamily: 'Avenir',
      headerFontFamily: 'Tiempos',
    },

    sizes: {
      Button: {
        sm: {
          fontSize: 14,
          height: 32,
          padding: '0 12px',
        },
        md: {
          fontSize: 16,
          height: 40,
          padding: '0 16px',
        },
        lg: {
          fontSize: 16,
          height: 48,
          padding: '0 20px',
        },
      },
      Badge: {
        sm: {
          fontSize: 10,
          borderRadius: 10,
          padding: '4px 8px',
        },
        md: {
          fontSize: 12,
          borderRadius: 12,
          padding: '4px 8px',
        },
        lg: {
          fontSize: 14,
          borderRadius: 14,
          padding: '6px 12px',
        },
      },
      CheckIcon: {
        sm: {
          fontSize: '12px',
          top: '8px',
        },
        md: {
          fontSize: '18px',
          top: '4px',
        },
      },
      RadioIcon: {
        sm: {
          height: '7px',
          width: '7px',
        },
        md: {
          height: '10px',
          width: '10px',
        },
      },
      CheckboxIcon: {
        sm: {
          height: '12px',
          width: '12px',
          minWidth: '12px',
          borderRadius: '2px',
          borderWidth: '1px',
          top: '10px',
          '&:before': {
            height: '12px',
            width: '12px',
            borderRadius: '6px',
            top: '-5px',
            left: '-5px',
          },
        },
        md: {
          height: '18px',
          width: '18px',
          minWidth: '18px',
          borderRadius: '2px',
          borderWidth: '2px',
          top: '6px',
          '&:before': {
            height: '18px',
            width: '18px',
            borderRadius: '6px',
            top: '-6px',
            left: '-6px',
          },
        },
      },
      CheckboxLabel: {
        sm: {
          fontSize: 14,
          lineHeight: '14px',
          marginTop: 10,
        },
        md: {
          fontSize: 16,
          lineHeight: '16px',
          marginTop: 8,
        },
      },
    },

    variants: {
      Alert: alertVariants,
      Badge: badgeVariants,
      Button: buttonVariants,
    },
  };
};
