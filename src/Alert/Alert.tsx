import React from 'react';
import { css } from 'styled-components';
import { space, SpaceProps } from 'styled-system';
import { getComponentVariant, createComponent } from '../utils';

export interface AlertProps extends SpaceProps {
  variant?: string;
  children?: string | React.ReactNode;
}

/** Alerts are typically used to display meaningful copy to users - typically notifying the user of an important message. */
export const Alert = createComponent<AlertProps>({
  name: 'Alert',
  style: ({ variant, theme }) => {
    const variantStyles = variant ? getComponentVariant(theme, 'Alert', variant) : '';

    return css`
      padding: 1rem;
      margin-bottom: 1rem;
      border: 0;
      font-size: 14px;
      font-family: ${theme.typography.bodyFontFamily || 'inherit'};
      border-radius: ${theme.radius}px;

      a {
        color: inherit;
        text-decoration: underline;
      }

      ${variantStyles}
      ${space}
    `;
  },
});

Alert.defaultProps = {
  variant: 'primary',
};
