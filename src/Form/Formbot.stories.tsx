import React, { useContext, createRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as yup from 'yup';
import { Formbot, Context } from './Formbot';
import { Form } from './Form';
import { Field } from './Field';
import { Fieldset } from './Fieldset';
import { FormError } from './FormError';
import PhoneInput from './PhoneInput';
import DateInput from './DateInput';
import Select from './Select';
import CheckboxGroup from './CheckboxGroup';
import RadioGroup from './RadioGroup';
import Switch from './Switch';
import { Button } from '../Button';
import { Input } from './Input';

const ButtonAsAny = Button as any;

export default {
  title: 'Components|Forms/Formbot',
  component: Formbot,
};

export const Basic = () => (
  <Formbot
    validationSchema={{
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .required()
        .min(4),
    }}>
    <Form>
      <Input name="email" label="Email" />
      <Input name="password" label="Password" />

      <Field>
        <ButtonAsAny type="submit">Sign In</ButtonAsAny>
      </Field>
    </Form>
  </Formbot>
);

const randomCallback = async (_value: any) => {
  const callback = (resolve: any) => {
    setTimeout(() => {
      resolve(false);
    }, 2000);
  };

  return new Promise(callback);
};

export const AsyncValidation = () => (
  <Formbot
    validationSchema={{
      random: yup.string().test('valid', 'This test was delayed by 2 seconds.', randomCallback as any),
    }}>
    <Form>
      <Input name="random" label="random" />

      <Field>
        <ButtonAsAny type="submit">Sign In</ButtonAsAny>
      </Field>
    </Form>
  </Formbot>
);

export const FullExample = () => {
  const selectValues = [
    { id: 1, value: 'male', label: 'Male' },
    { id: 1, value: 'female', label: 'Female' },
  ];

  const checkboxValues = [
    {
      id: 1,
      value: 'test',
      label: 'Checkbox 1',
    },
    {
      id: 2,
      value: 'test2',
      label: 'Checkbox 2',
    },
  ];

  const radioValues = [
    {
      id: 1,
      value: 'radio1',
      name: 'radio1',
      label: 'Radio 1',
    },
    {
      id: 2,
      value: 'radio2',
      name: 'radio2',
      label: 'Radio 2',
    },
  ];
  const Values = () => {
    const state: any = useContext(Context);
    return <pre>{JSON.stringify(state.values, null, 2)}</pre>;
  };

  class FormbotExample extends React.Component {
    nameRef: any = createRef();

    componentDidMount() {
      this.nameRef.current.focus();
    }

    render() {
      return (
        <Formbot
          validations={{
            name: (val: any) => {
              if (val !== 'Bob') {
                throw new Error('Your name must be Bob');
              }
            },
            email: {
              required: true,
            },
            gender: {
              required: true,
            },
            message: {
              required: true,
            },
            checkboxes: {
              required: true,
            },
            radioGroup: {
              required: true,
            },
            switch1: {
              required: true,
            },
          }}>
          <Form>
            <Fieldset legend="A Group of Inputs">
              <Input name="name" placeholder="Name (should autofocus)" label="Name" ref={this.nameRef} />

              <Input name="email" placeholder="Email" label="Email" shouldRenderError={false} />
              <FormError name="email">
                {(error: any) => <span style={{ color: 'navy' }}>Hi, I am a custom error: {error}</span>}
              </FormError>

              <PhoneInput name="phone" placeholder="Phone Number" label="Phone" />
              <DateInput name="dob" placeholder="MM/DD/YYYY" label="Date of Birth" />
              <Select name="gender" placeholder="Select a Gender" label="Gender" options={selectValues} />
            </Fieldset>

            <Fieldset legend="Another Group of Inputs">
              <Input name="message" multiline size="md" autogrow placeholder="Your Message" label="Write a Message" />

              <Input name="favorite_word" placeholder="Favorite Word" label="Favorite Word" />

              <CheckboxGroup label="Checkboxes" name="checkboxes" choices={checkboxValues} />
              <RadioGroup label="Radios" name="radioGroup" horizontal choices={radioValues} />
              <Switch name="switch1" />
            </Fieldset>

            <ButtonAsAny htmlType="submit" type="primary" size="sm">
              Submit
            </ButtonAsAny>

            <Values />
          </Form>
        </Formbot>
      );
    }
  }

  return <FormbotExample />;
};
