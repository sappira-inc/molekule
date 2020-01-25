import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import Icon from '../Icon';
import FormError from '../Form/FormError';
import { createEasyInput } from './EasyInput';
import { getComponentSize, createComponent } from '../utils';

const transitionTiming = '250ms cubic-bezier(0.4, 0, 0.2, 1)';

const HiddenInput = createComponent({
  name: 'CheckboxInput',
  tag: 'input',
  style: css`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    left: 1px;
    white-space: nowrap;
  `,
});

const CheckIcon = createComponent({
  name: 'CheckIcon',
  as: Icon,
  style: ({ theme, iconSize }) => {
    const sizeStyles = getComponentSize(theme, 'CheckIcon', iconSize);

    return css`
      position: absolute;
      color: white;
      opacity: 0;
      transition: opacity ${transitionTiming};
      font-size: 20px;

      ${sizeStyles}
    `;
  },
});

const CheckboxShape = createComponent({
  name: 'CheckboxShape',
  as: 'div',
  style: ({ theme, isRadio, isFocused, size }) => {
    const checkboxSizeStyles = getComponentSize(theme, 'Checkbox', size);
    const radioSizeStyles = getComponentSize(theme, 'Radio', size);

    return css`
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-style: solid;
      border-radius: 2px;
      transition: background-color ${transitionTiming}, border-color ${transitionTiming};

      &:before,
      &:after {
        content: '';
        position: absolute;
        opacity: 0;
        transition: opacity ${transitionTiming};
        box-sizing: border-box;
      }

      &:before {
        border: 4px solid ${theme.colors.colorFocus};
        border-radius: 6px;
        box-sizing: content-box;
        z-index: -1;

        ${isRadio &&
          css`
            border-radius: 50%;
            height: ${radioSizeStyles.height};
            width: ${radioSizeStyles.width};
          `}
      }

      ${checkboxSizeStyles}

      ${isFocused &&
        css`
          &:before {
            opacity: 1;
          }
        `}

      ${isRadio &&
        css`
          border-radius: 50%;

          &:after {
            opacity: 1;
            border-radius: 50%;
            border-style: solid;
            border-color: white;
          }

          ${radioSizeStyles}
        `}
    `;
  },
});

const CheckboxLabel = createComponent({
  name: 'CheckboxLabel',
  as: 'span',
  style: ({ theme, size }) => {
    const sizeStyles = getComponentSize(theme, 'CheckboxLabel', size);

    return css`
      transition: color ${transitionTiming};

      ${sizeStyles}
    `;
  },
});

const CheckboxContainer = createComponent({
  name: 'CheckboxContainer',
  tag: 'label',
  style: ({ theme, isChecked, isDisabled, isHorizontal, size, color }) => {
    const sizeStyles = getComponentSize(theme, 'CheckboxContainer', size);

    return css`
    display: inline-flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 4px;
    user-select: none;
    cursor: pointer;

    ${CheckboxShape} {
      border-color: ${theme.colors[color]};
    }

    ${sizeStyles}

    &:hover {
      ${CheckboxShape} {
        border-color: ${theme.colors.greyDarker};
      }
    }

    ${isHorizontal &&
      css`
        & + & {
          margin-left: 18px;
        }
      `}

    ${isChecked &&
      css`
        ${CheckIcon} {
          opacity: 1;
        }

        ${CheckboxShape} {
          background-color: ${theme.colors[color]};
          border-color: ${theme.colors[color]} !important;
        }
      `}

    ${isDisabled &&
      css`
        cursor: not-allowed;

        ${CheckboxShape} {
          border-color: ${theme.colors.grey} !important;
          background-color: transparent !important;
        }

        ${CheckboxLabel} {
          color: ${theme.colors.grey};
        }

        ${isChecked &&
          css`
            ${CheckboxShape} {
              background-color: ${theme.colors.grey} !important;
            }
          `}
      `}
  `;
  },
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
    size: PropTypes.string,
    horizontal: PropTypes.bool,
    disabled: PropTypes.bool,
    styles: PropTypes.shape(),
    colorOn: PropTypes.string,
    colorOff: PropTypes.string,
    ariaLabel: PropTypes.string,
    checkIconColor: PropTypes.string,
    checkIcon: PropTypes.string,
  };

  static defaultProps = {
    size: 'md',
    valueTrue: true,
    valueFalse: false,
    colorOn: 'primary',
    colorOff: 'greyDark',
    horizontal: false,
    onChange() {},
    disabled: false,
    styles: {},
    label: 'Checkbox',
    checkIconColor: 'white',
    checkIcon: 'check',
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

  handleFocus = () => {
    this.setState({ isFocused: !this.state.isFocused });
  };

  handleActive = () => {
    this.setState({ isActive: !this.state.isActive });
  };

  render() {
    const {
      label,
      id,
      error,
      name,
      size,
      checkIcon,
      checkIconColor,
      isRadio,
      colorOn,
      colorOff,
      horizontal,
      disabled,
      styles,
      ariaLabel,
    } = this.props;
    const { checked } = this;
    const { isFocused, isActive } = this.state;

    return (
      <>
        <CheckboxContainer
          isChecked={checked}
          isDisabled={disabled}
          isFocused={isFocused}
          isHorizontal={horizontal}
          style={styles.CheckboxContainer}
          htmlFor={id}
          size={size}
          color={checked ? colorOn : colorOff}
          onMouseDown={this.handleActive}
          onMouseUp={this.handleActive}>
          <HiddenInput
            aria-label={ariaLabel || label}
            id={id}
            name={name}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleFocus}
          />
          <CheckboxShape size={size} isRadio={isRadio} isChecked={checked} isFocused={isFocused}>
            {checked && !isRadio && <CheckIcon name={checkIcon} color={checkIconColor} iconSize={size} />}
          </CheckboxShape>

          {label && (
            <CheckboxLabel size={size} style={styles.Label}>
              {label}
            </CheckboxLabel>
          )}
        </CheckboxContainer>

        {!isFocused && !isActive && error ? <FormError>{error}</FormError> : null}
      </>
    );
  }
}

export default createEasyInput(Checkbox);
