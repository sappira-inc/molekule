import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { space } from 'styled-system';
import { getComponentVariant, createComponent } from '../utils';

const StyledAlert = createComponent({
  name: 'Alert',
  style: ({ variant, theme }) => {
    const { backgroundColor, fontColor } = getComponentVariant(theme, 'Alert', variant);

    return css`
      padding: 1rem;
      margin-bottom: 1rem;
      border: 0;
      font-size: 14px;
      font-family: ${theme.typography.fontFamily || 'inherit'};
      border-radius: ${theme.elementRadius}px;
      border-left: 4px solid ${fontColor};
      background: ${backgroundColor};
      color: ${fontColor};

      a {
        color: inherit;
        text-decoration: underline;
      }

      ${space};
    `;
  },
});

const Alert = props => <StyledAlert {...props} />;

Alert.propTypes = {
  variant: PropTypes.string,
};

Alert.defaultProps = {
  variant: 'primary',
};

export default Alert;
