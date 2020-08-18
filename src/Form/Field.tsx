import { css } from 'styled-components';
import { createComponent } from '../utils';

interface FieldProps {
  styles?: any;
}

export const Field = createComponent<FieldProps>({
  name: 'Field',
  style: css`
    position: relative;
    transition: 175ms;

    & + & {
      margin-top: 1rem;
    }
  `,
});
