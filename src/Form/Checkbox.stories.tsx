import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { boolean } from '@storybook/addon-knobs';
import { Flex } from '../Flex';
import { Checkbox } from './Checkbox';

export default {
  title: 'Components|Forms/Checkbox',
  component: Checkbox,
};

export const Basic = () => <Checkbox />;

export const Label = () => <Checkbox label="I'm a checkbox" disabled={boolean('Disabled', false)} />;

export const Radio = () => <Checkbox isRadio />;

export const LongText = () => (
  <Flex width={300}>
    <Checkbox
      id="checkbox"
      name="checkbox"
      label="'Cause I've been goin' off and they don't know when it's stoppin'
And when you get to toppin', I see that you've been learnin'"
    />
  </Flex>
);

export const Colors = () => (
  <Checkbox id="checkbox" name="checkbox" colorOn="green" colorOff="red" label="Red Off, Green On" />
);

export const Sizes = () => (
  <Flex flexDirection="column">
    <Checkbox id="default" name="default" label="Default (md)" />
    <Checkbox id="small" name="small" label="Small (sm)" size="sm" />
  </Flex>
);

export const Errors = () => (
  <Checkbox id="checkbox" name="checkbox" label="I'm a checkbox" error="Something is seriously wrong" />
);
