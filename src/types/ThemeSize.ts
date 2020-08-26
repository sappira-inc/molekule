import { defaultBreakpoints } from 'defaultBreakpoints';
import { ExtendedCSSProperties } from './ExtendedCSSProperties';

type Transform<T> = {
  [P in keyof T]: ExtendedCSSProperties;
};

export interface ThemeSize extends Partial<Transform<typeof defaultBreakpoints>> {}
