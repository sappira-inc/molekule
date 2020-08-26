import { Theme } from 'types';
import { merge } from 'lodash';
import { defaultThemeColors } from './defaultThemeColors';
import { BadgeVariants } from './types/BadgeVariants';
import { defaultBadgeVariants } from './defaultBadgeVariants';
import { defaultTheme } from './defaultTheme';
import { ButtonVariants } from './types';

export const createTheme = (customTheme?: Partial<Theme>): Theme => {
  const colors = {
    ...defaultThemeColors,
    ...customTheme?.colors,
  };

  const badgeVariants: BadgeVariants = merge<{}, BadgeVariants, BadgeVariants>({}, defaultBadgeVariants, {
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
  });

  const buttonVariants: ButtonVariants = merge<{}, ButtonVariants, ButtonVariants>({}, defaultTheme.variants.Button, {
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
      color: colors.primary,
      '&:hover': {
        color: colors.primaryDark,
      },
    },
    secondary: {
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
  });

  return {
    ...defaultTheme,
    colors,
    breakpoints: {
      ...defaultTheme.breakpoints,
      ...customTheme?.breakpoints,
    },
    typography: {
      ...defaultTheme.typography,
      color: colors.black,
    },
    variants: {
      ...defaultTheme.variants,
      Alert: badgeVariants,
      Badge: badgeVariants,
      Button: buttonVariants,
    },
  };
};
