export default (overrides = {}) => {
  const shadow = '0 3px 6px hsla(0,0%,60%,.1), 0 3px 6px hsla(0,0%,60%,.15), 0 -1px 2px hsla(0,0%,60%,.02)';
  const shadowHover = '0 6px 9px hsla(0,0%,60%,.2), 0 6px 9px hsla(0,0%,60%,.2), 0 -1px 2px hsla(0,0%,60%,.08)';

  const colors = Object.assign(
    {
      default: '#333333',
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
      fontColor: 'white',
    },
    info: {
      backgroundColor: colors.primary,
      fontColor: 'white',
    },
    secondary: {
      backgroundColor: colors.white,
      fontColor: colors.primary,
      style: `
        border-color: ${colors.primary};
        &:hover {
          border-color: ${colors.primary};
          background: ${colors.primary};
          color: white;
        }

        &:active {
          background: ${colors.primaryDark};
          border-color: ${colors.primaryDark};
          color: white;
        }
      `,
    },
    success: {
      backgroundColor: colors.secondary,
      fontColor: 'white',
      style: `
        &:hover {
          border-color: ${colors.secondaryLight};
          background: ${colors.secondaryLight};
        }
        &:active {
          border-color: ${colors.secondaryDark};
          background: ${colors.secondaryDark};
        }
        &[disabled] {
          border-color: ${colors.secondaryLightest};
          background: ${colors.secondaryLightest};
        }
      `,
    },
    danger: {
      backgroundColor: colors.red,
      fontColor: 'white',
      style: `
        &:hover {
          border-color: ${colors.redLight};
          background: ${colors.redLight};
        }
        &:active {
          border-color: ${colors.redDark};
          background: ${colors.redDark};
        }
        &[disabled] {
          border-color: ${colors.redLightest};
          background: ${colors.redLightest};
        }
      `,
    },
    warning: {
      backgroundColor: colors.orange,
      fontColor: 'white',
      style: `
        &:hover {
          border-color: ${colors.orangeLight};
          background: ${colors.orangeLight};
        }
        &:active {
          border-color: ${colors.orangeDark};
          background: ${colors.orangeDark};
        }
        &[disabled] {
          border-color: ${colors.orangeLightest};
          background: ${colors.orangeLightest};
        }
    `,
    },
    grey: {
      backgroundColor: colors.white,
      fontColor: colors.greyDarkest,
      style: `
        border-color: ${colors.grey};
  
        &[disabled] {
          background: ${colors.white};
          color: ${colors.grey};
        }
  
        &:hover {
          background: ${colors.white};
          color: ${colors.greyDarkest};
          border-color: ${colors.greyDark};
        }
  
        &:active {
          background: ${colors.greyLight};
          border-color: ${colors.greyLight};
        }
      `,
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
      fontColor: colors.greyDark,
    },
  };

  const alertVariants = badgeVariants;

  const heights = {
    xs: 28,
    sm: 24,
    md: 32,
    lg: 40,
    xl: 48,
  };

  const fontSizes = {
    xs: 8,
    sm: 10,
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

  const fonts = [
    {
      name: 'Tiempos',
      url: '//cdn.heydoctor.co/fonts/TiemposHeadlineWeb-Semibold.woff2',
      format: 'woff2',
      weight: 500,
    },
  ];

  return {
    breakpoints,
    classPrefix: 're',
    colors,
    fontSizes,
    fonts,
    grid,
    heights,
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
