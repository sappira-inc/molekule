import React from 'react';
import Tabs from './Tabs';

export default {
  title: 'Components|Tabs',
  component: Tabs,
};

export const Horizontal = () => (
  <>
    <Tabs
      tabs={[
        {
          id: 'test-a-one',
          title: 'Tab One',
          content: <div>Hey, first panel</div>,
        },
        {
          id: 'test-a-two',
          title: 'Tab Two',
          content: <div>Hey, second panel</div>,
        },
        {
          id: 'test-a-three',
          title: 'Tab Three',
          content: <div>Hey, third panel</div>,
          disabled: true,
        },
      ]}
    />
  </>
);

export const Vertical = () => (
  <Tabs
    vertical
    tabs={[
      {
        id: 'test-b-one',
        title: 'Tab One',
        content: <div>Hey, first panel</div>,
      },
      {
        id: 'test-b-two',
        title: 'Tab Two',
        content: <div>Hey, second panel</div>,
      },
      {
        id: 'test-b-three',
        title: 'Tab Three',
        content: <div>Hey, third panel</div>,
        disabled: true,
      },
    ]}
  />
);
