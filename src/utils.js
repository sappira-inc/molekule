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

export const createComponent = ({ name, tag = 'div', as, style, props: baseProps = () => ({}) }) => {
  const component = as ? styled(as) : styled[tag];

  return component.attrs(props => {
    const resolvedProps = {
      ...baseProps(props),
      ...props,
    };
    return {
      ...resolvedProps,
      className: getComponentClassName(resolvedProps, kebabCase(name)),
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

export const getNextCursorPosition = (cursorPos, newValue, oldValue) => {
  const cursorDiff = newValue.length - oldValue.length;
  let nextPosition = cursorPos;

  if (cursorDiff > 1 || cursorDiff < -1) {
    nextPosition += cursorDiff < 0 ? cursorDiff + 1 : cursorDiff - 1;
  }

  return nextPosition;
};

export const isDeletingCharacter = (char, oldValue, newValue, cursorPos) => {
  const currentCharacter = oldValue.charAt(cursorPos);
  const isCharacter = char instanceof RegExp ? char.test(currentCharacter) : char === currentCharacter;

  // Character before our cursor matches test and new value is shorter than old value
  return isCharacter && newValue.length < oldValue.length;
};
