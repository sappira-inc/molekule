import { css } from 'styled-components';
import { createComponent } from '../utils';

const FormError = createComponent({
  name: 'FormError',
  tag: 'span',
  style: css`
    display: block;
    margin: 4px 0 0 4px;
    color: ${p => p.theme.colors.red};
    font-size: 10px;
  `,
});

export default FormError;
