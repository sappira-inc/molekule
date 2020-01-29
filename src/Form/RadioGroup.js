import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import Checkbox from './Checkbox';
import Label from './Label';
import FormError from './FormError';
import { createEasyInput } from './EasyInput';
import GroupContainer from './GroupContainer';
import { createComponent } from '../utils';

const StyledRadioGroup = createComponent({
  name: 'RadioGroup',
  as: Box,
});

export class RadioGroup extends Component {
  static propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    colorOn: PropTypes.string,
    colorOff: PropTypes.string,
    fontSize: PropTypes.number,
    iconSize: PropTypes.number,
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
        disabled: PropTypes.bool,
      })
    ),
    styles: PropTypes.shape(),
    iconOn: PropTypes.string,
    iconOff: PropTypes.string,
  };

  static defaultProps = {
    choices: [],
    onChange() {},
    styles: {},
    iconOn: 'radiobox-marked',
    iconOff: 'radiobox-blank',
  };

  static getDerivedStateFromProps(props, state) {
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

  handleChange = (field, value) => {
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
