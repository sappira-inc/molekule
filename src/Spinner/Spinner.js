import { css, keyframes } from 'styled-components';
import { rgba } from 'polished';
import { createComponent } from '../utils';

const spin = keyframes`
  from { transform: rotate(0deg); }
  from { transform: rotate(360deg); }
`;

const Spinner = createComponent({
  name: 'Spinner',
  style: ({ size = 15 }) => css`
    height: ${size}px;
    width: ${size}px;
    border: ${size / 10}px solid ${p => rgba(p.theme.colors.primary, 0.3)};
    border-right-color: ${p => p.theme.colors.primary};
    border-radius: 50%;
    animation: ${spin} 1.1s infinite linear;
  `,
});

export default Spinner;
