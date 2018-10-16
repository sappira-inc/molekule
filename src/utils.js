import { get, kebabCase } from 'lodash';
import styled from 'styled-components';

export const getFromTheme = (theme, lookup, fallback) => get(theme, lookup, fallback);

export const getComponentVariant = (theme, key, variant) => {
  const config = getFromTheme(theme, `components.${key}.variants.${variant}`, theme.variants[variant]);
  if (!config) throw new Error(`Refractal: "${variant}" variant not found in theme...`);
  return config;
};

export const getComponentStyle = key => ({ theme }) => getFromTheme(theme, `components.${key}.style`, {});

export const getComponentClassName = name => ({ theme: { classPrefix }, variant }) =>
  `${classPrefix}-${name} ${variant ? `${classPrefix}-${name}-${variant}` : ''}`.trim();

export const createComponent = ({ name, tag = 'div', as, style, attrs = {} }) => {
  const component = as ? styled(as) : styled[tag];

  return component.attrs({
    className: getComponentClassName(kebabCase(name)),
    ...attrs,
  })`
    ${style}
    ${getComponentStyle(name)}
    ${({ styles = {} }) => styles[name] || {}}
  `;
};
