import { css } from 'styled-components';
import { createComponent } from '../utils';

const Field = createComponent({
  name: 'Field',
  style: css`
    position: relative;
    transition: 175ms;

    & + & {
      margin-top: 1rem;
    }
  `,
});

export default Field;
