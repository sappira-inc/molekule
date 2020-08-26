import React, { forwardRef, useContext } from 'react';
import { Context } from './Formbot';

/**
 * useContext has some slight performance issues. Every update to context re-renders
 * each subscribed component and there's currently no way to bail out of renders if the
 * values we care about haven't changed. Below is a sufficient workaround below and redux maintainers are discussing here: https://github.com/facebook/react/issues/14110
 */
const PureInput = React.memo(({ Component, ...props }: any) => <Component {...props} />);

export interface EasyInputProps {
  name?: string;
  Component?: any;
  shouldRenderError?: boolean;
}

function EasyInput<T extends EasyInputProps>({ name, Component, shouldRenderError = true, ...props }: T) {
  const state: any = useContext(Context);

  if (!state) {
    return <PureInput name={name} Component={Component} {...props} />;
  }

  const value = name && state.values[name];
  const defaultValue =
    Component.defaultProps && Component.defaultProps.defaultValue !== undefined
      ? Component.defaultProps.defaultValue
      : '';

  return (
    <PureInput
      name={name}
      value={value !== undefined ? value : defaultValue}
      error={shouldRenderError && name ? state.errors[name] : undefined}
      onChange={state.onChange}
      onBlur={state.onBlur}
      onFocus={state.onFocus}
      Component={Component}
      {...props}
    />
  );
}

export function createEasyInput<T extends EasyInputProps = any>(Component: any) {
  return forwardRef<any, T>((props: any, ref) => {
    return <EasyInput<T> Component={Component} forwardedRef={ref} {...props} />;
  });
}
