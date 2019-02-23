import React, { PureComponent, useContext } from 'react';
import { Context } from './Formbot';

/**
 * useContext has some slight performance issues. Every update to context re-renders
 * each subscribed component and there's currently no way to bail out of renders if the
 * values we care about haven't changed. Below is a sufficient workaround below and redux maintainers are discussing here: https://github.com/facebook/react/issues/14110
 */

class PureInput extends PureComponent {
  render() {
    const { Component, ...props } = this.props;

    return (
      <Component {...props} />
    )
  }
}

function EasyInput({ name, Component, ...props  }) {
  const state = useContext(Context);

  if (!state) {
    return <PureInput name={name} {...props} />
  }

  return (
    <PureInput
      name={name}
      value={state.values[name] || ''}
      error={state.errors[name]}
      onChange={state.onChange}
      onBlur={state.onBlur}
      onFocus={state.onFocus}
      Component={Component}
      {...props}
    />
  );
}

export const createEasyInput = Component => props => <EasyInput Component={Component} {...props} />

export default EasyInput;
