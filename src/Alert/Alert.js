import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { space } from 'styled-system';
import { getComponentVariant, createComponent } from '../utils';

const StyledAlert = createComponent({
  name: 'Alert',
  style: ({ variant, theme }) => {
    const variantStyles = getComponentVariant(theme, 'Alert', variant);

    return css`
      padding: 1rem;
      margin-bottom: 1rem;
      border: 0;
      font-size: 14px;
      font-family: ${theme.typography.fontFamily || 'inherit'};
      border-radius: ${theme.radius}px;

      a {
        color: inherit;
        text-decoration: underline;
      }

      ${variantStyles}
      ${space};
    `;
  },
});

/** Alerts are typically used to display meaningful copy to users - typically notifying the user of an important message. */
const Alert = props => <StyledAlert {...props} />;

Alert.propTypes = {
  variant: PropTypes.string,
};

Alert.defaultProps = {
  variant: 'primary',
};

export default Alert;
