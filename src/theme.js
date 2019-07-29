export default (overrides = {}) => {
  const shadow = '0 3px 6px hsla(0,0%,60%,.1), 0 3px 6px hsla(0,0%,60%,.15), 0 -1px 2px hsla(0,0%,60%,.02)';
  const shadowHover = '0 6px 9px hsla(0,0%,60%,.2), 0 6px 9px hsla(0,0%,60%,.2), 0 -1px 2px hsla(0,0%,60%,.08)';

  const colors = Object.assign(
    {
      primaryDark: '#002BA0',
      primary: '#2DAAF2',
      primaryLight: '#9FB8FC',

      grayDarkest: '#494D55',
      grayDarker: '#767980',
      grayDark: '#A4A6AA',
      grayMid: '#8E97A7',
      gray: '#D1D2D5',
      grayLight: '#E8E9EA',
      grayLightest: '#F1F4F6',

      redLightest: '#FFD7D8',
      redLight: '#FE7B7E',
      red: '#FD575D',
      redDark: '#F23338',

      blueDark: '#006DC1',
      blue: '#0747A5',
      blueLight: '#C8E8FF',

      greenDark: '#00AC74',
      green: '#21B986',
      greenLight: '#42C79B',
      greenLightest: '#DDF5ED',

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

  const greyButton = {
    backgroundColor: colors.white,
    fontColor: colors.grayDarkest,
    style: `
      border-color: ${colors.gray};

      &[disabled] {
        background: ${colors.white};
        color: ${colors.gray};
      }

      &:hover {
        background: ${colors.white};
        color: ${colors.grayDarkest};
        border-color: ${colors.grayDark};
      }

      &:active {
        background: ${colors.grayLight};
        border-color: ${colors.grayLight};
      }
    `,
  };

  const buttonVariants = {
    primary: {
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
      backgroundColor: colors.green,
      fontColor: 'white',
      style: `
        &:hover {
          border-color: ${colors.greenLight};
          background: ${colors.greenLight};
        }
        &:active {
          border-color: ${colors.greenDark};
          background: ${colors.greenDark};
        }
        &[disabled] {
          border-color: ${colors.greenLightest};
          background: ${colors.greenLightest};
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
    },
    info: {
      backgroundColor: colors.blue,
      fontColor: 'white',
    },
    grey: greyButton,
    gray: greyButton,
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
    sm: 24,
    md: 32,
    lg: 40,
    xl: 48,
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
