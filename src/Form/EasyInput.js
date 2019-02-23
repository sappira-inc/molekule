import React, { useContext } from 'react';
import { Context } from './Formbot';

function EasyInput({ InputComponent, ...props  }) {
  const state = useContext(Context);

  if (!state) {
    return <InputComponent {...props} />
  }

  return (
    <InputComponent
      value={state.values[name]}
      error={state.errors[name]}
      onChange={state.onChange}
      onBlur={state.onBlur}
      onFocus={state.onFocus}
      {...props}
    />
  )
}

export const createEasyInput = Component => props => <EasyInput InputComponent={Component} {...props} />

export default EasyInput;
