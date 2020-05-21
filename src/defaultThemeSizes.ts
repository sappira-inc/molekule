import { ThemeSizes } from './types';

export const defaultThemeSizes: ThemeSizes = {
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
  CheckboxContainer: {
    sm: {
      minHeight: '24px',
    },
    md: {
      minHeight: '30px',
    },
  },
  CheckIcon: {
    sm: {
      fontSize: '12px',
    },
    md: {
      fontSize: '20px',
    },
  },
  Checkbox: {
    sm: {
      height: '12px',
      width: '12px',
      minWidth: '12px',
      borderWidth: '1px',
      marginTop: '3px',
      '&:before': {
        height: '12px',
        width: '12px',
      },
    },
    md: {
      height: '18px',
      width: '18px',
      minWidth: '18px',
      borderWidth: '2px',
      marginTop: '1px',
      ':before': {
        width: '18px',
        height: '18px',
      },
    },
  },
  Radio: {
    sm: {
      height: '14px',
      width: '14px',
      minWidth: '14px',
      marginTop: '2px',
      ':before': {
        width: '14px',
        height: '14px',
      },
      ':after': {
        width: '10px',
        height: '10px',
        borderWidth: '2px',
      },
    },
    md: {
      height: '20px',
      width: '20px',
      minWidth: '20px',
      marginTop: '0px',
      ':before': {
        width: '20px',
        height: '20px',
      },
      ':after': {
        width: '16px',
        height: '16px',
        borderWidth: '3px',
      },
    },
  },
  CheckboxLabel: {
    sm: {
      fontSize: '14px',
      marginLeft: '8px',
    },
    md: {
      fontSize: '16px',
      marginLeft: '10px',
    },
  },
};
