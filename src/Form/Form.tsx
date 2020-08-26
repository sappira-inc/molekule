import React, { useContext } from 'react';
import { Context } from './Formbot';

export function Form({ children, ...props }: any) {
  const state = useContext(Context) as any;

  return (
    <form onSubmit={state && state.onSubmit} {...props}>
      {children}
    </form>
  );
}
