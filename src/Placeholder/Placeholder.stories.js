import React from 'react';
import Placeholder from './Placeholder';

export default {
  title: 'Components|Placeholder',
  component: Placeholder,
};

export const Basic = () => <Placeholder delay={500} loading />;

export const WithDelay = () => (
  <Placeholder delay={2000} loading={false}>
    <span>Hey, I'm loaded asynchronously.</span>
  </Placeholder>
);

/**  If an error occurs during an async call, pass an error message to the Placeholder component. It will call  `renderError` if provided, otherwise will fallback to default error UI.
 */
export const WithError = () => <Placeholder error="Some weird error occured..." />;
