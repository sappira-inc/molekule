import React from 'react';
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

export const Autogrow = () => <Input {...defaultInputProps} multiline autogrow />;

export const FloatingLabel = () => <Input {...defaultInputProps} floating />;

export const Disabled = () => <Input {...defaultInputProps} disable />;

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
