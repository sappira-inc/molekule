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
  };

  const buttonVariants = {
    primary: {
      backgroundColor: colors.primary,
      fontColor: colors.white,
    },
    success: {
      backgroundColor: colors.green,
      fontColor: colors.white,
    },
    danger: {
      backgroundColor: colors.red,
      fontColor: colors.white,
    },
    warning: {
      backgroundColor: colors.orange,
      fontColor: colors.white,
    },
    info: {
      backgroundColor: colors.blue,
      fontColor: colors.white,
    },
    grey: {
      backgroundColor: colors.greyLight,
      fontColor: colors.greyDarkest,
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
    xs: 28,
    sm: 32,
    md: 36,
    lg: 40,
    xl: 44,
  };

  const fontSizes = {
    xs: 8,
    sm: 10,
    md: 12,
    lg: 14,
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
    radius: 4,
    shadow,
    shadowHover,
    typography,
    variants: {
      Alert: alertVariants,
      Badge: badgeVariants,
      Button: buttonVariants,
    },
  };
};
