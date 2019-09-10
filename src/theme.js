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
    fontSize: 14,
    bodyFontFamily: 'Avenir',
    headerFontFamily: 'Tiempos',
  };

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
    grid,
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
    },
    variants: {
      Alert: alertVariants,
      Badge: badgeVariants,
      Button: buttonVariants,
    },
  };
};
