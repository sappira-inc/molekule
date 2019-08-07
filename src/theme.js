export default (overrides = {}) => {
  const shadow = '0 3px 6px hsla(0,0%,60%,.1), 0 3px 6px hsla(0,0%,60%,.15), 0 -1px 2px hsla(0,0%,60%,.02)';
  const shadowHover = '0 6px 9px hsla(0,0%,60%,.2), 0 6px 9px hsla(0,0%,60%,.2), 0 -1px 2px hsla(0,0%,60%,.08)';

  const colors = Object.assign(
    {
      primaryDark: '#002BA0',
      primary: '#2DAAF2',
      primaryLight: '#9FB8FC',

      greyDarkest: '#43526D',
      greyDark: '#8E97A7',
      grey: '#8E97A7',
      greyLight: '#DEE0E4',
      greyLightest: '#F1F4F6',

      redDark: '#B22327',
      red: '#FD575D',
      redLight: ' #FFCECF',

      blueDark: '#006DC1',
      blue: '#0747A5',
      blueLight: '#C8E8FF',

      greenDark: '#196C1C',
      green: '#00D684',
      greenLight: '#B4F7DE',

      orangeDark: '#BB520B',
      orange: '#FFAA70',
      orangeLight: '#FFD8BD',

      yellowDark: '#F1BC0B',
      yellow: '#FED23D',
      yellowLight: '#FFEDB1',

      purpleDark: '#8530FD',
      purple: '#9D58FE',
      purpleLight: '#DFC8FF',
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
      fontColor: 'white',
    },
    success: {
      backgroundColor: colors.green,
      fontColor: 'white',
    },
    danger: {
      backgroundColor: colors.red,
      fontColor: 'white',
    },
    warning: {
      backgroundColor: colors.orange,
      fontColor: 'white',
    },
    info: {
      backgroundColor: colors.blue,
      fontColor: 'white',
    },
    grey: {
      backgroundColor: colors.greyLight,
      fontColor: colors.greyDarkest,
    },
  };

  const badgeVariants = {
    primary: {
      backgroundColor: colors.primaryLight,
      fontColor: colors.primaryDark,
    },
    success: {
      backgroundColor: colors.greenLight,
      fontColor: colors.greenDark,
    },
    danger: {
      backgroundColor: colors.redLight,
      fontColor: colors.redDark,
    },
    warning: {
      backgroundColor: colors.orangeLight,
      fontColor: colors.orangeDark,
    },
    info: {
      backgroundColor: colors.blueLight,
      fontColor: colors.blueDark,
    },
    grey: {
      backgroundColor: colors.greyLight,
      fontColor: colors.greyDarkest,
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
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
  };

  const inputHeights = {
    xs: 32,
    sm: 40,
    md: 48,
    lg: 56,
    xl: 60,
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
    inputHeights,
    radii,
    radius: 8,
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
