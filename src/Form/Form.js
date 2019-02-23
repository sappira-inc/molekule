
import React, { useContext } from 'react';
import { Context } from './Formbot';

function Form({ children, ...props  }) {
  const state = useContext(Context);

  return (
    <form onSubmit={state && state.onSubmit} {...props}>
      {children}
    </form>
  )
}

export default Form;
