import React from 'react';
import Accordion from './Accordion';

export default {
  title: 'Components|Accordion',
  component: Accordion,
};

export const Basic = () => (
  <Accordion
    items={[
      {
        title: 'Item One',
        content: 'Item One Content',
      },
      {
        title: 'Item Two',
        content: 'Item Two Content',
      },
    ]}
  />
);
