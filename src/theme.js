export default (overrides = {}) => {
  const shadow = '0 3px 6px hsla(0,0%,60%,.1), 0 3px 6px hsla(0,0%,60%,.15), 0 -1px 2px hsla(0,0%,60%,.02)';
  const shadowHover = '0 6px 9px hsla(0,0%,60%,.2), 0 6px 9px hsla(0,0%,60%,.2), 0 -1px 2px hsla(0,0%,60%,.08)';

  const colors = Object.assign(
    {
      default: '#494D55',
      black: '#1B202B',
      white: '#FFFFFF',

      greyLightest: '#F8F8F9',
      greyLighter: '#F4F4F4',
      greyLight: '#E8E9EA',
      grey: '#D1D2D5',
      greyDark: '#A4A6AA',
      greyDarker: '#767980',
      greyDarkest: '#494D55',

      primaryLightest: '#CADCFF',
      primaryLight: '#4D89FF',
      primary: '#226EFF',
      primaryDark: '#0958F3',

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
    overrides.colors
  );

  const radii = [0, 2, 4];

  const typography = {
    fontSize: 12,
    bodyFontFamily: 'Avenir',
    headerFontFamily: 'Tiempos',
  };

  const buttonVariants = {
    primary: {
      backgroundColor: colors.primary,
      fontColor: colors.white,
      hover: {
        backgroundColor: colors.primaryLight,
      },
      active: {
        backgroundColor: colors.primaryDark,
      },
      disabled: {
        backgroundColor: colors.primaryLightest,
      },
    },
    secondary: {
      backgroundColor: colors.white,
      fontColor: colors.primary,
      borderColor: colors.primary,
      textColor: colors.primary,
      hover: {
        backgroundColor: colors.primary,
        fontColor: colors.white,
      },
      active: {
        backgroundColor: colors.primaryDark,
        fontColor: colors.white,
      },
      disabled: {
        fontColor: colors.primaryLightest,
        borderColor: colors.primaryLightest,
      },
    },
    grey: {
      backgroundColor: colors.white,
      fontColor: colors.greyDarkest,
      borderColor: colors.grey,
      textColor: colors.greyDarkest,
      hover: {
        borderColor: colors.greyDark,
      },
      active: {
        backgroundColor: colors.greyLight,
      },
      disabled: {
        fontColor: colors.grey,
        borderColor: colors.grey,
      },
    },
    success: {
      backgroundColor: colors.secondary,
      fontColor: colors.white,
      hover: {
        backgroundColor: colors.secondaryLight,
      },
      active: {
        backgroundColor: colors.secondaryDark,
      },
      disabled: {
        backgroundColor: colors.secondaryLightest,
      },
    },
    warning: {
      backgroundColor: colors.orange,
      fontColor: colors.white,
      hover: {
        backgroundColor: colors.orangeLight,
      },
      active: {
        backgroundColor: colors.orangeDark,
      },
      disabled: {
        backgroundColor: colors.orangeLightest,
      },
    },
    danger: {
      backgroundColor: colors.red,
      fontColor: colors.white,
      hover: {
        backgroundColor: colors.redLight,
      },
      active: {
        backgroundColor: colors.redDark,
      },
      disabled: {
        backgroundColor: colors.redLightest,
      },
    },
    info: {
      backgroundColor: colors.blue,
      fontColor: colors.white,
    },
  };

  const badgeVariants = {
    primary: {
      backgroundColor: colors.primaryLightest,
      fontColor: colors.primaryDark,
    },
    success: {
      backgroundColor: colors.greenLightest,
      fontColor: colors.greenDark,
    },
    danger: {
      backgroundColor: colors.redLightest,
      fontColor: colors.redDark,
    },
    warning: {
      backgroundColor: colors.orangeLightest,
      fontColor: colors.orangeDark,
    },
    info: {
      backgroundColor: colors.blueLightest,
      fontColor: colors.blueDark,
    },
    grey: {
      backgroundColor: colors.greyLight,
      fontColor: colors.greyDarker,
    },
  };

  const alertVariants = badgeVariants;

  const heights = {
    xs: 24,
    sm: 28,
    md: 32,
    lg: 40,
    xl: 48,
  };

  const fontSizes = {
    xs: 8,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 16,
  };

  const breakpoints = [480, 768, 1024, 1440];

  const grid = {
    containerMaxWidth: 1000,
    gutter: 16,
    columns: 12,
    sizes: {
      xs: breakpoints[0],
      sm: breakpoints[1],
      md: breakpoints[2],
      lg: breakpoints[3],
    },
  };

  return {
    breakpoints,
    classPrefix: 're',
    colors,
    fontSizes,
    grid,
    heights,
    radii,
    radius: 8,
    shadow,
    shadowHover,
    typography,
    sizes: {
      Button: {
        sm: {
          fontSize: 14,
          height: 32,
        },
        md: {
          fontSize: 16,
          height: 40,
        },
        lg: {
          fontSize: 16,
          height: 48,
        },
      },
      Badge: {
        sm: {
          fontSize: 12,
          paddingVertical: 4,
          paddingHorizontal: 8,
        },
        md: {
          fontSize: 14,
          paddingVertical: 5,
          paddingHorizontal: 10,
        },
        lg: {
          fontSize: 16,
          paddingVertical: 6,
          paddingHorizontal: 12,
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
