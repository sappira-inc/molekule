import { get, kebabCase } from 'lodash';
import styled from 'styled-components';

export const themeGet = (lookup, fallback) => ({ theme } = {}) => get(theme, lookup, fallback);

export const getComponentVariant = (theme, componentName, variant) => {
  const config = themeGet(`variants.${componentName}.${variant}`)({
    theme,
  });

  if (!config) throw new Error(`Molekule: "${variant}" variant not found in theme...`);
  return config;
};

const getComponentStyle = componentName => themeGet(`styles.${componentName}`, {});

const getVariantStyles = (componentName, variant) => themeGet(`variants.${componentName}.${variant}.style`, {});

const getComponentClassName = ({ className, theme: { classPrefix }, variant }, name) =>
  `${className || ''} ${classPrefix}-${name} ${variant ? `${classPrefix}-${name}-${variant}` : ''}`.trim();

export const createComponent = ({ name, tag = 'div', as, style, props: getBaseProps = () => ({}) }) => {
  const component = as ? styled(as) : styled[tag];

  return component.attrs(props => {
    const baseProps = getBaseProps(props);
    const finalProps = {
      ...baseProps,
      ...props,
      className: baseProps.className || props.className,
    };

    return {
      ...finalProps,
      className: getComponentClassName(finalProps, kebabCase(name)),
    };
  })`
  ${style}
  ${getComponentStyle(name)}
  ${p => getVariantStyles(name, p.variant)}
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

export const getNextCursorPosition = (cursorPos, oldValue, newValue) => {
  const cursorDiff = newValue.length - oldValue.length;
  let nextPosition = cursorPos;

  if (cursorDiff > 1 || cursorDiff < -1) {
    nextPosition += cursorDiff < 0 ? cursorDiff + 1 : cursorDiff - 1;
  }

  return Math.max(nextPosition, 0);
};
