import { defaultThemeColors } from 'defaultThemeColors';

type Transform<T> = {
  [P in keyof T]: string;
};

export interface ThemeColors extends Transform<typeof defaultThemeColors> {}
