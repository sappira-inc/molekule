import React from 'react';
import Alert from './Alert';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'Components|Alert',
  component: Alert,
};

export const Basic = () => {
  const variant = text('Variant', 'success');

  return (
    <>
      <Alert variant={variant}>
        <strong>Well done!</strong> You successfully read this important <a href="google.com">alert link</a> message.
      </Alert>
      <Alert variant="info">This is a generic informational message.</Alert>
      <Alert variant="danger">
        <strong>Oops!</strong> Something wen't wrong.
      </Alert>
      <Alert variant="warning">
        <strong>Caution!</strong> There be dragons.
      </Alert>
    </>
  );
};
