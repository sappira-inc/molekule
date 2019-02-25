import React, { useContext } from 'react';
import Input from './Input';
import Select from './Select';
import Formbot, { Context } from './Formbot';
import Form from './Form';
import Button from '../Button';
import FormGroup from './FormGroup';
import Fieldset from './Fieldset';
import CheckboxGroup from './CheckboxGroup';
import RadioGroup from './RadioGroup';
import Switch from './Switch';

const selectValues = [{ id: 1, value: 'male', label: 'Male' }, { id: 1, value: 'female', label: 'Female' }];

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
  const state = useContext(Context);
  return (
    <pre>{JSON.stringify(state.values, null, 2)}</pre>
  )
}

export default function() {
  return (
    <Formbot
      initialValues={{
        name: '',
        email: '',
        message: '',
      }}
      validations={{
        name: val => {
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
          <Input name="name" placeholder="Name" label="Name" />
          <Input name="email" placeholder="Email" label="Email" />

          <Select
            name="gender"
            placeholder="Select a Gender"
            label="Gender"
            options={selectValues}
          />
        </Fieldset>

        <Fieldset legend="Another Group of Inputs">
          <Input
            name="message"
            multiline
            size="md"
            autogrow
            placeholder="Your Message"
            label="Write a Message"
          />

          <CheckboxGroup name="checkboxes" choices={checkboxValues} />
          <RadioGroup name="radioGroup" horizontal choices={radioValues} />
          <Switch name="switch1" />
        </Fieldset>

        <Button htmlType="submit" type="primary" size="sm">
          Submit
        </Button>

        <Values />
      </Form>
    </Formbot>
  );
}
