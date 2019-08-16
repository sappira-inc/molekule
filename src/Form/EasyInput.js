import React, { forwardRef, useContext } from 'react';
import { Context } from './Formbot';

/**
 * useContext has some slight performance issues. Every update to context re-renders
 * each subscribed component and there's currently no way to bail out of renders if the
 * values we care about haven't changed. Below is a sufficient workaround below and redux maintainers are discussing here: https://github.com/facebook/react/issues/14110
 */
const PureInput = React.memo(({ Component, ...props }) => <Component {...props} />);

function EasyInput({ name, Component, shouldRenderError = true, ...props }) {
  const state = useContext(Context);

  if (!state) {
    return <PureInput name={name} Component={Component} {...props} />;
  }

  const value = state.values[name];
  const defaultValue =
    Component.defaultProps && Component.defaultProps.defaultValue !== undefined
      ? Component.defaultProps.defaultValue
      : '';

  return (
    <PureInput
      name={name}
      value={value !== undefined ? value : defaultValue}
      error={shouldRenderError ? state.errors[name] : undefined}
      onChange={state.onChange}
      onBlur={state.onBlur}
      onFocus={state.onFocus}
      Component={Component}
      {...props}
    />
  );
}

export const createEasyInput = Component =>
  forwardRef((props, ref) => <EasyInput Component={Component} forwardedRef={ref} {...props} />); // eslint-disable-line

export default EasyInput;
