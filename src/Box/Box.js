import { compose, space, color, typography, layout, flexbox, position, background } from 'styled-system';
import propTypes from '@styled-system/prop-types';
import { createComponent } from '../utils';

const Box = createComponent({
  name: 'Box',
  style: compose(
    space,
    color,
    typography,
    layout,
    flexbox,
    position,
    background
  ),
});

Box.propTypes = {
  ...propTypes.space,
  ...propTypes.color,
  ...propTypes.typography,
  ...propTypes.layout,
  ...propTypes.flexbox,
  ...propTypes.position,
  ...propTypes.background,
};

export default Box;
