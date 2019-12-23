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
  style: ({ theme, color, iconSize }) => {
    const checkIconStyles = getComponentSize(theme, 'CheckIcon', iconSize);

    return css`
      color: ${theme.colors[color]};
      position: absolute;
      z-index: 1;

      ${checkIconStyles}
    `;
  },
});

const CheckboxIcon = createComponent({
  name: 'CheckboxIcon',
  as: 'div',
  style: ({ theme, size, color, isChecked, isFocused, isRadio }) => {
    const sizeStyles = getComponentSize(theme, 'CheckboxIcon', size);
    const radioStyles = getComponentSize(theme, 'RadioIcon', size);

    return css`
      transition: 250ms;
      position: relative;
      border: solid ${theme.colors[color]};

      &:before, &:after {
        transition: opacity 250ms;
        content: '';
        position: absolute;
        opacity: 0;
      }

      ${sizeStyles}

      ${isChecked &&
        css`
          background: ${theme.colors[color]};
          border-color: ${theme.colors[color]};

          ${isRadio &&
            css`
              background: white;

              &:after {
                opacity: 1;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: ${theme.colors[color]};

                ${radioStyles}
              }
            `}
        `}

      ${isFocused &&
        css`
          &:before {
            opacity: 1;
            border: 4px solid ${theme.colors.primaryLightest};
            z-index: -1;
          }
        `}

      ${isRadio &&
        css`
          border-radius: 50%;

          &:before {
            border-radius: 50%;
          }
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
      ${!checked &&
        !disabled &&
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
    const { isFocused } = this.state;

    return (
      <>
        <CheckboxContainer
          horizontal={horizontal}
          style={styles.CheckboxContainer}
          checked={checked}
          disabled={disabled}
          htmlFor={id}>
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

          <Flex>
            {checked && !isRadio && (
              <CheckIcon name={checkIcon} color={checkIconColor} iconSize={size} isRadio={isRadio} />
            )}
            <CheckboxIcon
              size={size}
              color={checked ? colorOn : colorOff}
              isChecked={checked}
              isFocused={isFocused}
              isRadio={isRadio}
            />

            {label && (
              <CheckboxLabel size={size} style={styles.Label}>
                {label}
              </CheckboxLabel>
            )}
          </Flex>
        </CheckboxContainer>

        {!isFocused && error ? <FormError>{error}</FormError> : null}
      </>
    );
  }
}

export default createEasyInput(Checkbox);
