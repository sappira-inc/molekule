import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import Label from './Label';
import FormError from './FormError';
import Flex from '../Flex';
import Box from '../Box';
import { createComponent } from '../utils';

const StyledRadioGroup = createComponent({
  name: 'RadioGroup',
  as: Box,
});

export default class RadioGroup extends Component {
  static propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    colorOn: PropTypes.string,
    colorOff: PropTypes.string,
    size: PropTypes.string,
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
        disabled: PropTypes.bool,
      })
    ),
  };

  static defaultProps = {
    choices: [],
    onChange() {},
    size: 'md',
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

    this.setState({ value });

    this.props.onChange(this.props.name, value);
  };

  render() {
    const { choices, error, horizontal, label, name, colorOn, colorOff, size } = this.props;

    return (
      <StyledRadioGroup>
        {label && <Label>{label}</Label>}

        <Flex flexDirection={horizontal ? 'row' : 'column'}>
          {choices.length &&
            choices.map(choice => {
              const { value = choice.id, label: choiceLabel } = choice;
              const key = `RadioButton-${name}-${value}`;

              return (
                <Checkbox
                  id={key}
                  key={key}
                  name={key}
                  horizontal={horizontal}
                  size={size}
                  colorOn={colorOn}
                  colorOff={colorOff}
                  label={choiceLabel}
                  value={this.state.value}
                  valueTrue={value}
                  iconOn="radiobox-marked"
                  iconOff="radiobox-blank"
                  onChange={this.handleChange}
                />
              );
            })}
        </Flex>

        {!!error && <FormError>{error}</FormError>}
      </StyledRadioGroup>
    );
  }
}
