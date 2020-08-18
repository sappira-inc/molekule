import styled, { css } from 'styled-components';
import Flex from '../Flex';

interface GroupContainerProps {
  horizontal?: boolean;
}

const GroupContainer = styled(Flex)<GroupContainerProps>(
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
