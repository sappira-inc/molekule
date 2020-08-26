import React, { Component } from 'react';
import { Box } from '../Box';
import Checkbox from './Checkbox';
import { FormError } from './FormError';
import { createEasyInput } from './EasyInput';
import GroupContainer from './GroupContainer';

interface CheckboxGroupProps {
  id?: string;
  name?: string;
  horizontal?: boolean;
  value?: string[] | number[] | string | number;
  choices: {
    value: string | number;
    label: string;
    disabled?: boolean;
    exclusive?: boolean;
    id?: any;
  }[];
  onChange?: (name?: string, newSelected?: any) => void;
  colorOn?: string;
  colorOff?: string;
  error?: string;
}

export class CheckboxGroup extends Component<CheckboxGroupProps> {
  static defaultProps = {
    horizontal: false,
    onChange() {},
    colorOn: 'primary',
    colorOff: 'greyDark',
  };

  state = {
    selected: Array.isArray(this.props.value) ? [...this.props.value] : [],
  };

  createChangeHandler = (choice: any) => (_name: any, value: any) => {
    const { selected } = this.state;
    let newSelected: any;
    if (!selected.includes(value)) {
      if (choice.exclusive) {
        newSelected = [value];
      } else {
        newSelected = this.props.choices
          .filter(c => !c.exclusive && (c.value === value || selected.includes(c.value)))
          .map(c => c.value);
      }
    } else {
      const index = selected.indexOf(value);
      newSelected = [...selected.slice(0, index), ...selected.slice(index + 1)];
    }

    this.setState(
      {
        selected: newSelected,
      },
      () => {
        // eslint-disable-next-line no-unused-expressions
        this.props.onChange?.(this.props.name, newSelected);
      }
    );
  };

  render() {
    const { name, choices, error, horizontal, colorOn, colorOff, ...checkboxProps } = this.props;
    const { selected } = this.state;

    return (
      <Box>
        <GroupContainer horizontal={horizontal}>
          {choices.length &&
            choices.map(choice => {
              const { value = choice.id } = choice;
              const key = `checkbox-${name}-${value}`;

              return (
                <Checkbox
                  {...checkboxProps}
                  key={key}
                  id={key}
                  name={key}
                  label={choice.label}
                  colorOn={colorOn}
                  colorOff={colorOff}
                  horizontal={horizontal}
                  value={selected && selected.includes(value) ? value : null}
                  valueTrue={value}
                  valueFalse={value}
                  onChange={this.createChangeHandler(choice)}
                />
              );
            })}
        </GroupContainer>
        {!!error && <FormError>{error}</FormError>}
      </Box>
    );
  }
}

export default createEasyInput(CheckboxGroup);
