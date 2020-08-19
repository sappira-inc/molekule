import kebabCase from 'lodash/kebabCase';
import get from 'lodash/get';
import styled, { CSSProp } from 'styled-components';

export const themeGet = (lookup: any, fallback?: any) => ({ theme }: any = {}) => get(theme, lookup, fallback);

export const getComponentVariant = (theme: any, componentName: string, variant: string) => {
  const config = themeGet(`variants.${componentName}.${variant}`)({
    theme,
  });

  if (!config) throw new Error(`Molekule: "${variant}" variant not found in theme...`);
  return config;
};

export const getComponentSize = (theme: any, componentName: string, size: string) =>
  themeGet(`sizes.${componentName}.${size}`, {})({ theme });

export const getComponentStyle = (componentName: string) => themeGet(`styles.${componentName}`, {});

export const getVariantStyles = (componentName: string, variant: string) =>
  themeGet(`variants.${componentName}.${variant}.style`, {});

interface GetComponentClassNameProps {
  className: string;
  theme: {
    classPrefix: string;
  };
  variant: string;
}

const getComponentClassName = (
  { className, theme: { classPrefix }, variant }: GetComponentClassNameProps,
  name: string
) => `${className || ''} ${classPrefix}-${name} ${variant ? `${classPrefix}-${name}-${variant}` : ''}`.trim();

interface CreateComponentProps<T> {
  name: string;
  tag?: keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
  as?: React.ComponentType<any> | keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
  style?: ((props: any) => CSSProp) | CSSProp;
  props?: (props: T) => any;
}

export const createComponent = <
  T extends object,
  O extends keyof JSX.IntrinsicElements | React.ComponentType<any> = 'div'
>({
  name,
  tag = 'div',
  as,
  style,
  props: getBaseProps = () => ({}),
}: CreateComponentProps<T>) => {
  const component = styled<O>((as || tag) as any);

  return component.attrs<T>((props: any) => {
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
  })<T>`
  ${style}
  ${getComponentStyle(name)}
  ${(p: any) => getVariantStyles(name, p.variant)}
  ${({ styles = {} }) => styles[name] || {}}
`;
};

// eslint-disable-next-line
const focusableFilter = (node: any) =>
  node.tabIndex >= 0 && !node.hasAttribute('disabled') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;

type FilterFn = (node?: any) => any;

const createTreeWalker = (root: any, currentNode: any, filterFn: FilterFn = () => NodeFilter.FILTER_ACCEPT) => {
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

export const findPreviousFocusableElement = (root: any, currentNode: any) => {
  const treeWalker = createTreeWalker(root, currentNode, focusableFilter);

  if (!treeWalker.previousNode() || treeWalker.currentNode === root) {
    return treeWalker.lastChild();
  }

  return treeWalker.currentNode;
};

export const findNextFocusableElement = (root: any, currentNode: any) => {
  const treeWalker = createTreeWalker(root, currentNode, focusableFilter);

  if (!treeWalker.nextNode() || treeWalker.currentNode === root) {
    treeWalker.currentNode = root;
    return treeWalker.firstChild();
  }

  return treeWalker.currentNode;
};

export const getNextCursorPosition = (cursorPos: any, oldValue: any, newValue: any) => {
  const cursorDiff = newValue.length - oldValue.length;
  let nextPosition = cursorPos;

  if (cursorDiff > 1 || cursorDiff < -1) {
    nextPosition += cursorDiff < 0 ? cursorDiff + 1 : cursorDiff - 1;
  }

  return Math.max(nextPosition, 0);
};
