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

const getComponentClassName = ({ className, theme: { classPrefix }, variant }, name) =>
  `${className || ''} ${classPrefix}-${name} ${variant ? `${classPrefix}-${name}-${variant}` : ''}`.trim();

export const createComponent = ({ name, tag = 'div', as, style, props: getBaseProps = () => ({}) }) => {
  const component = as ? styled(as) : styled[tag];

  return component.attrs(props => {
    const baseProps = getBaseProps(props);
    const finalProps = {
      ...props,
      ...baseProps,
      className: baseProps.className || props.className,
    };

    return {
      ...finalProps,
      className: getComponentClassName(finalProps, kebabCase(name)),
    };
  })`
    ${style}
    ${getComponentStyle(name)}
    ${({ styles = {} }) => styles[name] || {}}
  `;
};

// eslint-disable-next-line
const focusableFilter = node =>
  node.tabIndex >= 0 && !node.hasAttribute('disabled') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;

const createTreeWalker = (root, currentNode, filterFn = () => NodeFilter.FILTER_ACCEPT) => {
  const treeWalker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: filterFn,
    },
    false
  );
  treeWalker.currentNode = currentNode;
  return treeWalker;
};

export const findPreviousFocusableElement = (root, currentNode) => {
  const treeWalker = createTreeWalker(root, currentNode, focusableFilter);

  if (!treeWalker.previousNode() || treeWalker.currentNode === root) {
    return treeWalker.lastChild();
  }

  return treeWalker.currentNode;
};

export const findNextFocusableElement = (root, currentNode) => {
  const treeWalker = createTreeWalker(root, currentNode, focusableFilter);

  if (!treeWalker.nextNode() || treeWalker.currentNode === root) {
    treeWalker.currentNode = root;
    return treeWalker.firstChild();
  }

  return treeWalker.currentNode;
};
