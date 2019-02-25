import React from 'react';
import Input from './Input';
import Select from './Select';
import Formbot from './Formbot';
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
      {({ values, onSubmit, onChange, errors, onBlur }) => (
        <form onSubmit={onSubmit}>
          <Fieldset legend="Some Fields">
            <Input
              onBlur={onBlur}
              error={errors.name}
              onChange={onChange}
              value={values.name}
              name="name"
              placeholder="Name"
              label="Name"
            />
            <Input
              onBlur={onBlur}
              error={errors.email}
              onChange={onChange}
              value={values.email}
              name="email"
              placeholder="Email"
              label="Email"
            />
          </Fieldset>
          <Fieldset legend="More Fields">
            <Select
              onBlur={onBlur}
              error={errors.gender}
              label="Gender"
              onChange={onChange}
              id="gender"
              options={selectValues}
              value={values.gender}
              name="gender"
              placeholder="Select a Gender"
            />
            <Input
              onBlur={onBlur}
              onChange={onChange}
              value={values.message}
              error={errors.message}
              name="message"
              multiline
              size="md"
              autogrow
              placeholder="Your Message"
              label="Write a Message"
            />
            <FormGroup>
              <CheckboxGroup
                error={errors.checkboxes}
                value={values.checkboxes}
                name="checkboxes"
                id="checkboxes"
                onChange={onChange}
                choices={checkboxValues}
              />
              <RadioGroup
                error={errors.radioGroup}
                name="radioGroup"
                horizontal
                value={values.radio}
                id="radio"
                onChange={onChange}
                choices={radioValues}
              />
            </FormGroup>
          </Fieldset>
          <FormGroup>
            <Switch name="switch1" id="switch1" onChange={onChange} toggled={values.switch1} />
          </FormGroup>
          <Button htmlType="submit" type="primary" size="sm">
            Submit
          </Button>
        </form>
      )}
    </Formbot>
  );
}
