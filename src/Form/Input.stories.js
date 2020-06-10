import React from 'react';
import { object, select, boolean } from '@storybook/addon-knobs/react';
import Formbot from './Formbot';
import Button from '../Button';
import { Input } from './Input';

export default {
  title: 'Components|Forms/Input',
  component: Input,
};

const defaultInputProps = {
  label: 'Example',
  placeholder: 'Start typing here...',
};

export const Basic = () => <Input label="Example" placeholder="Start typing here..." />;

export const Controlled = () => {
  function ControlledInput() {
    return (
      <Formbot
        onSubmit={console.log}
        initialValues={{ value: '' }}
        validations={{
          value: value => {
            if (value !== 'secretpassword') {
              throw new Error('Try typing "secretpassword"');
            }
          },
        }}>
        {({ values, errors, onChange, onSubmit }) => (
          <form onSubmit={onSubmit}>
            <Input
              label="Input with Formbot"
              name="value"
              value={values.value}
              error={errors.value}
              onChange={onChange}
            />
            <Button mt={2} type="submit">
              Submit
            </Button>
          </form>
        )}
      </Formbot>
    );
  }

  return <ControlledInput />;
};

export const Multiline = () => (
  <Input
    {...defaultInputProps}
    multiline
    value="I already have a value! If provided a value, I become controlled, so I won't update when you type here..."
  />
);
export const MultilineFloating = () => <Input {...defaultInputProps} floating multiline />;

export const Autogrow = () => <Input {...defaultInputProps} multiline autogrow />;

export const FloatingLabel = () => <Input {...defaultInputProps} floating />;

export const Disabled = () => <Input {...defaultInputProps} disabled />;

export const Error = () => <Input {...defaultInputProps} error="This is an error message" />;

export const Styles = () => (
  <Input
    {...defaultInputProps}
    styles={{
      Input: {
        background: 'beige',
      },
    }}
  />
);

export const Icon = () => {
  const iconOptions = {
    Information: 'information-outline',
    Visibility: 'eye-outline',
    Alert: 'alert',
    'Area 51': 'alien',
  };

  return (
    <Input
      floating={boolean('Floating', false)}
      disabled={boolean('Disabled', false)}
      leftIcon={select('Left Icon', iconOptions, 'information-outline')}
      leftIconProps={object('Left Icon Props', { color: 'greyDarker', size: 16 })}
      rightIcon={select('Right Icon', iconOptions, 'eye-outline')}
      rightIconProps={object('Right Icon Props', { color: 'greyDarker', size: 24 })}
      {...defaultInputProps}
    />
  );
};
