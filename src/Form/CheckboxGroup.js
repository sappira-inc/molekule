import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Flex from '../Flex';
import Box from '../Box';
import Checkbox from './Checkbox';
import FormError from './FormError';
import { createEasyInput } from './EasyInput';

class CheckboxGroup extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    horizontal: PropTypes.bool,
    value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
        disabled: PropTypes.bool,
      })
    ).isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    defaultValue: [],
    color: 'primary',
    horizontal: false,
    onChange() {},
  };

  state = {
    selected: Array.isArray(this.props.value) ? [...this.props.value] : [],
  };

  createChangeHandler = choice => (name, value) => {
    const { selected } = this.state;
    let newSelected;
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
        this.props.onChange(this.props.name, newSelected);
      }
    );
  };

  render() {
    const { name, color, choices, error, horizontal } = this.props;
    const { selected } = this.state;

    return (
      <Box>
        <Flex flexDirection={horizontal ? 'row' : 'column'}>
          {choices.length &&
            choices.map(choice => {
              const { value = choice.id } = choice;
              const key = `checkbox-${name}-${value}`;

              return (
                <Checkbox
                  key={key}
                  id={key}
                  name={key}
                  label={choice.label}
                  color={color}
                  horizontal={horizontal}
                  value={selected && selected.includes(value) ? value : null}
                  valueTrue={value}
                  valueFalse={value}
                  onChange={this.createChangeHandler(choice)}
                />
              );
            })}
        </Flex>
        {!!error && <FormError>{error}</FormError>}
      </Box>
    );
  }
}

export default createEasyInput(CheckboxGroup);
