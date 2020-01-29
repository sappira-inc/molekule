import styled, { css } from 'styled-components';
import Flex from '../Flex';

const GroupContainer = styled(Flex)(
  ({ theme, horizontal }) => css`
    flex-direction: column;

    ${horizontal &&
      css`
        @media (min-width: ${theme.breakpoints.sm}) {
          flex-direction: row;
        }
      `}
  `
);

export default GroupContainer;
