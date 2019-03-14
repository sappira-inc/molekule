import { get, kebabCase } from 'lodash';
import styled from 'styled-components';

export const themeGet = (lookup, fallback) => ({ theme } = {}) => get(theme, lookup, fallback);

export const getComponentVariant = (theme, componentName, variant) => {
  const config = themeGet(`components.${componentName}.variants.${variant}`, theme.variants[componentName][variant])({
    theme,
  });
  if (!config) throw new Error(`Molekule: "${variant}" variant not found in theme...`);
  return config;
};

export const getComponentStyle = componentName => themeGet(`components.${componentName}.style`);

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

const createTreeWalker = (root, currentNode) => {
  const treeWalker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(node) {
        return node.tabIndex >= 0 && !node.hasAttribute('disabled') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    },
    false
  );
  treeWalker.currentNode = currentNode;
  return treeWalker;
};

export const findPreviousFocusableElement = (root, currentNode) => {
  const treeWalker = createTreeWalker(root, currentNode);

  if (!treeWalker.previousNode() || treeWalker.currentNode === root) {
    return treeWalker.lastChild();
  }

  return treeWalker.currentNode;
};

export const findNextFocusableElement = (root, currentNode) => {
  const treeWalker = createTreeWalker(root, currentNode);

  if (!treeWalker.nextNode() || treeWalker.currentNode === root) {
    treeWalker.currentNode = root;
    return treeWalker.firstChild();
  }

  return treeWalker.currentNode;
};
