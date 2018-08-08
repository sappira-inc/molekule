import React from 'react';
import { capitalize } from 'lodash';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import FormError from '../Form/FormError';
import Flex from '../Flex';
import { createComponent } from '../utils';

const CheckboxContainer = createComponent({
  name: 'Checkbox',
  tag: 'label',
}).extend`
  position: relative;
  margin-bottom: 0;
  cursor: pointer;

  & + & {
    margin-left: ${p => (p.horizontal ? '12px' : 0)};
    margin-top: ${p => (p.horizontal ? 0 : '4px')};
  }
`;

const StyledInput = createComponent({
  name: 'CheckboxInput',
  tag: 'input',
}).extend`
  display: none;
  pointer-events: ${p => (p.disabled ? 'none' : 'auto')};
`;

const StyledIcon = createComponent({
  name: 'CheckboxIcon',
  as: Icon,
});

const StyledLabel = createComponent({
  name: 'CheckboxLabel',
  as: Flex,
}).extend`
  margin-left: 8px;
  font-size: ${p => p.fontSize}px;
`;

export default class Checkbox extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
    valueTrue: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
    valueFalse: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
    onChange: PropTypes.func,
    iconOn: PropTypes.string,
    iconOff: PropTypes.string,
    iconSize: PropTypes.number,
    fontSize: PropTypes.number,
    color: PropTypes.string,
    horizontal: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    color: 'primary',
    iconOn: 'checkbox-marked',
    iconOff: 'checkbox-blank-outline',
    valueTrue: true,
    valueFalse: false,
    iconSize: 18,
    horizontal: false,
    onChange() {},
    disabled: false,
  };

  state = {
    value: this.props.value,
  };

  get checked() {
    return this.state.value === this.props.valueTrue;
  }

  componentDidUpdate() {
    if (this.props.value !== undefined && this.state.value !== this.props.value) {
      this.setState({
        value: this.props.value,
      });
    }
  }

  handleChange = () => {
    const { valueTrue, valueFalse, onChange } = this.props;

    const newValue = this.checked ? valueFalse : valueTrue;

    this.setState(
      {
        value: newValue,
      },
      () => {
        onChange(this.props.name, newValue);
      }
    );
  };

  render() {
    const { label, id, error, name, fontSize, iconOn, iconOff, iconSize, color, horizontal, disabled } = this.props;
    const { checked } = this;

    return (
      <CheckboxContainer horizontal={horizontal}>
        <StyledInput
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={this.handleChange}
        />

        <Flex alignItems="center">
          <StyledIcon size={iconSize} color={color} checked={checked} name={checked ? iconOn : iconOff} />

          {label && <StyledLabel fontSize={fontSize}>{label}</StyledLabel>}
        </Flex>
        {!this.state.focused && error ? <FormError>{capitalize(error)}</FormError> : null}
      </CheckboxContainer>
    );
  }
}