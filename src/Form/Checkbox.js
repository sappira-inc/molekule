import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import Icon from '../Icon';
import FormError from '../Form/FormError';
import Flex from '../Flex';
import { createEasyInput } from './EasyInput';
import { createComponent } from '../utils';

const CheckboxContainer = createComponent({
  name: 'Checkbox',
  tag: 'label',
  style: () => css`
    position: relative;
    margin-bottom: 0;
    cursor: pointer;

    & + & {
      margin-left: ${p => (p.horizontal ? '12px' : 0)};
      margin-top: ${p => (p.horizontal ? 0 : '4px')};
    }
  `,
});

const StyledInput = createComponent({
  name: 'CheckboxInput',
  tag: 'input',
  style: css`
    display: none;
    pointer-events: ${p => (p.disabled ? 'none' : 'auto')};
  `,
});

const StyledIcon = createComponent({
  name: 'CheckboxIcon',
  as: Icon,
});

const StyledLabel = createComponent({
  name: 'CheckboxLabel',
  as: Flex,
  style: ({ fontSize }) => css`
    margin-left: 8px;
    font-size: ${fontSize}px;
  `,
});

class Checkbox extends React.Component {
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
    styles: PropTypes.shape(),
  };

  static defaultProps = {
    color: 'primary',
    iconOn: 'checkbox-marked',
    iconOff: 'checkbox-blank-outline',
    valueTrue: true,
    valueFalse: false,
    colorOn: 'primary',
    colorOff: 'grayMid',
    iconSize: 18,
    horizontal: false,
    onChange() {},
    disabled: false,
    styles: {},
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
    value: this.props.value,
  };

  get checked() {
    return this.state.value === this.props.valueTrue;
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
    const {
      label,
      id,
      error,
      name,
      fontSize,
      iconOn,
      iconOff,
      iconSize,
      colorOn,
      colorOff,
      horizontal,
      disabled,
      styles,
    } = this.props;
    const { checked } = this;

    return (
      <CheckboxContainer horizontal={horizontal} style={styles.CheckboxContainer}>
        <StyledInput
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={this.handleChange}
        />

        <Flex alignItems="center">
          <StyledIcon size={iconSize} color={checked ? colorOn : colorOff} name={checked ? iconOn : iconOff} />

          {label && <StyledLabel fontSize={fontSize} style={styles.Label}>{label}</StyledLabel>}
        </Flex>

        {!this.state.focused && error ? <FormError>{error}</FormError> : null}
      </CheckboxContainer>
    );
  }
}

export default createEasyInput(Checkbox);
