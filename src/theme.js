export default (overrides = {}) => {
  const shadow = '0 3px 6px hsla(0,0%,60%,.1), 0 3px 6px hsla(0,0%,60%,.15), 0 -1px 2px hsla(0,0%,60%,.02)';
  const shadowHover = '0 6px 9px hsla(0,0%,60%,.2), 0 6px 9px hsla(0,0%,60%,.2), 0 -1px 2px hsla(0,0%,60%,.08)';

  const colors = Object.assign(
    {
      primaryDark: '#002BA0',
      primary: '#2DAAF2',
      primaryLight: '#9FB8FC',

      grayDark: '#43526D',
      grayMid: '#8E97A7',
      gray: '#8E97A7',
      grayLight: '#DEE0E4',
      grayLightest: '#F1F4F6',

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
    gray: {
      backgroundColor: colors.grayLight,
      fontColor: colors.grayDark,
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
    gray: {
      backgroundColor: colors.grayLight,
      fontColor: colors.grayDark,
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
