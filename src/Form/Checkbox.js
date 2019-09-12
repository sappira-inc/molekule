import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import Icon from '../Icon';
import FormError from '../Form/FormError';
import Flex from '../Flex';
import { createEasyInput } from './EasyInput';
import { getComponentSize, createComponent } from '../utils';

const HiddenInput = createComponent({
  name: 'CheckboxInput',
  tag: 'input',
  style: css`
    display: none;
    pointer-events: ${p => (p.disabled ? 'none' : 'auto')};
  `,
});

const CheckboxIcon = createComponent({
  name: 'CheckboxIcon',
  as: Icon,
  style: ({ theme, iconSize }) => {
    const sizeStyles = getComponentSize(theme, 'CheckboxIcon', iconSize);

    return css`
      font-size: 24px;
      transition: color 125ms;

      ${sizeStyles}
    `;
  },
});

const CheckboxLabel = createComponent({
  name: 'CheckboxLabel',
  as: Flex,
  style: ({ theme, size }) => {
    const sizeStyles = getComponentSize(theme, 'CheckboxLabel', size);

    return css`
      margin-left: 8px;

      ${sizeStyles}
    `;
  },
});

const CheckboxContainer = createComponent({
  name: 'Checkbox',
  tag: 'label',
  style: ({ horizontal, checked, theme, disabled }) => css`
    position: relative;
    margin-bottom: 0;
    cursor: pointer;
    display: flex;
    align-items: flex-start;

    & + & {
      margin-left: ${horizontal ? 12 : 0}px;
      margin-top: ${horizontal ? 0 : 4}px;
    }

    &:hover {
      ${!checked && !disabled &&
        css`
          ${CheckboxIcon} {
            color: ${theme.colors.greyDarker};
          }
        `}
    }

    &[disabled] {
      cursor: not-allowed;
      pointer-events: none;

      ${CheckboxIcon}, ${CheckboxLabel} {
        color: ${theme.colors.grey};
      }
    }
  `,
});

export class Checkbox extends React.Component {
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
    size: PropTypes.string,
    horizontal: PropTypes.bool,
    disabled: PropTypes.bool,
    styles: PropTypes.shape(),
    colorOn: PropTypes.string,
    colorOff: PropTypes.string,
  };

  static defaultProps = {
    iconOn: 'checkbox-marked',
    iconOff: 'checkbox-blank-outline',
    size: 'md',
    valueTrue: true,
    valueFalse: false,
    colorOn: 'primary',
    colorOff: 'greyDark',
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
      size,
      iconOn,
      iconOff,
      colorOn,
      colorOff,
      horizontal,
      disabled,
      styles,
    } = this.props;
    const { checked } = this;

    return (
      <CheckboxContainer horizontal={horizontal} style={styles.CheckboxContainer} checked={checked} disabled={disabled}>
        <HiddenInput
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={this.handleChange}
        />

        <Flex>
          <CheckboxIcon iconSize={size} color={checked ? colorOn : colorOff} name={checked ? iconOn : iconOff} />

          {label && (
            <CheckboxLabel size={size} style={styles.Label}>
              {label}
            </CheckboxLabel>
          )}
        </Flex>

        {!this.state.focused && error ? <FormError>{error}</FormError> : null}
      </CheckboxContainer>
    );
  }
}

export default createEasyInput(Checkbox);
