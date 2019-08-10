import React, { useContext, createRef } from 'react';
import Input from './Input';
import Select from './Select';
import Formbot, { Context } from './Formbot';
import Form from './Form';
import Button from '../Button';
import Fieldset from './Fieldset';
import CheckboxGroup from './CheckboxGroup';
import RadioGroup from './RadioGroup';
import Switch from './Switch';
import PhoneInput from './PhoneInput';
import DateInput from './DateInput';
import FormError from './FormError';

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
  return <pre>{JSON.stringify(state.values, null, 2)}</pre>;
};

export default class FormbotExample extends React.Component {
  nameRef = createRef();

  componentDidMount() {
    this.nameRef.current.focus();
  }

  render() {
    return (
      <Formbot
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
            <Input name="name" placeholder="Name (should autofocus)" label="Name" ref={this.nameRef} />

            <Input name="email" placeholder="Email" label="Email" renderError={false} />
            <FormError name="email">
              {error => <span style={{ color: 'navy' }}>Hi, I am a custom error: {error}</span>}
            </FormError>

            <PhoneInput name="phone" placeholder="Phone Number" label="Phone" />
            <DateInput name="dob" placeholder="MM/DD/YYYY" label="Date of Birth" />
            <Select name="gender" placeholder="Select a Gender" label="Gender" options={selectValues} />
          </Fieldset>

          <Fieldset legend="Another Group of Inputs">
            <Input name="message" multiline size="md" autogrow placeholder="Your Message" label="Write a Message" />

            <Input name="favorite_word" placeholder="Favorite Word" label="Favorite Word" />

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
}
