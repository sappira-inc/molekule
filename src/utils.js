import { get, kebabCase } from 'lodash';
import styled from 'styled-components';

export const themeGet = (theme, lookup, fallback) => get(theme, lookup, fallback);

export const getComponentVariant = (theme, componentName, variant) => {
  const config = themeGet(
    theme,
    `components.${componentName}.variants.${variant}`,
    theme.variants[componentName][variant]
  );
  if (!config) throw new Error(`Molekule: "${variant}" variant not found in theme...`);
  return config;
};

export const getComponentStyle = componentName => ({ theme }) => themeGet(theme, `components.${componentName}.style`);

export const getComponentClassName = ({ className, theme: { classPrefix }, variant }, name) =>
  `${className || ''} ${classPrefix}-${name} ${variant ? `${classPrefix}-${name}-${variant}` : ''}`.trim();

export const createComponent = ({ name, tag = 'div', as, style, props: defaultProps = () => ({}) }) => {
  const component = as ? styled(as) : styled[tag];

  return component.attrs(props => ({
    ...defaultProps(props),
    ...props,
    className: getComponentClassName(props, kebabCase(name)),
  }))`
    ${style}
    ${getComponentStyle(name)}
    ${({ styles = {} }) => styles[name] || {}}
  `;
};
