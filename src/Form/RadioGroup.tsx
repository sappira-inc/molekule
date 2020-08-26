import React, { Component } from 'react';
import { Box, BoxProps } from '../Box';
import Checkbox from './Checkbox';
import Label from './Label';
import { FormError } from './FormError';
import { createEasyInput } from './EasyInput';
import GroupContainer from './GroupContainer';
import { createComponent } from '../utils';

interface RadioGroupChoice {
  id: string | number;
  value: string | number;
  label?: string;
  disabled?: boolean;
}

interface RadioGroupProps extends BoxProps {
  name?: string;
  onChange?: any;
  value?: string | number;
  colorOn?: string;
  colorOff?: string;
  fontSize?: number;
  iconSize?: number;
  choices: RadioGroupChoice[];
  styles?: any;
  iconOn?: string;
  iconOff?: string;
  error?: any;
  label?: string;
  horizontal?: any;
  colorFocus?: any;
  id?: string;
  disabled?: boolean;
}

const StyledRadioGroup = createComponent<BoxProps>({
  name: 'RadioGroup',
  as: Box,
});

export class RadioGroup extends Component<RadioGroupProps> {
  static defaultProps = {
    choices: [],
    onChange() {},
    styles: {},
    iconOn: 'radiobox-marked',
    iconOff: 'radiobox-blank',
  };

  static getDerivedStateFromProps(props: any, state: any) {
    if (props.value !== undefined && props.value !== state.value) {
      return {
        value: props.value,
      };
    }

    return null;
  }

  state = {
    value: this.props.value || null,
  };

  handleChange = (_field: any, value: any) => {
    // Bail out if value is the same
    if (this.state.value === value) return;

    this.setState({ value }, () => {
      this.props.onChange(this.props.name, value);
    });
  };

  render() {
    const { choices, error, horizontal, label, name, colorFocus, ...checkboxProps } = this.props;

    return (
      <StyledRadioGroup>
        {label && <Label>{label}</Label>}

        <GroupContainer horizontal={horizontal}>
          {choices.length &&
            choices.map(choice => {
              const { value = choice.id, label: choiceLabel } = choice;
              const key = `RadioButton-${name}-${value}`;

              return (
                <Checkbox
                  {...checkboxProps}
                  id={key}
                  key={key}
                  name={key}
                  horizontal={horizontal}
                  label={choiceLabel}
                  value={this.state.value}
                  valueTrue={value}
                  valueFalse={value}
                  onChange={this.handleChange}
                  colorFocus={colorFocus}
                  isRadio
                />
              );
            })}
        </GroupContainer>

        {!!error && <FormError>{error}</FormError>}
      </StyledRadioGroup>
    );
  }
}

export default createEasyInput(RadioGroup);
