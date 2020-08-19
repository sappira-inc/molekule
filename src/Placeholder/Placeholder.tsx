import React from 'react';
import { css } from 'styled-components';
import Box from '../Box';
import Button from '../Button';
import Spinner from '../Spinner';
import { createComponent } from '../utils';

const Container = createComponent<any>({
  name: 'Placeholder',
  style: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    min-height: 50px;
  `,
});

interface PlaceholderProps {
  loading?: boolean;
  error?: string;
  delay?: number;
  renderLoading?: any;
  renderError?: any;
  onReload?: any;
}

/** Placeholder shows a spinner after a specified delay while content is loaded asynchronously. */
export default class Placeholder extends React.Component<PlaceholderProps> {
  static defaultProps = {
    loading: false,
    delay: 250,
  };

  delayTimer: number;

  state = {
    delayed: false,
  };

  componentDidMount() {
    this.runDelay();
  }

  componentWillUnmount() {
    clearTimeout(this.delayTimer);
  }

  runDelay() {
    if (this.props.delay !== undefined && this.props.delay <= 0) return;

    this.setState({ delayed: true }, () => {
      this.delayTimer = setTimeout(() => {
        this.setState({
          delayed: false,
        });
      }, this.props.delay);
    });
  }

  render() {
    const { children, loading, error, renderLoading, renderError, onReload } = this.props;

    if (loading && this.state.delayed) {
      return null;
    }

    if (loading) {
      return renderLoading ? (
        renderLoading()
      ) : (
        <Container>
          <Spinner />
        </Container>
      );
    }

    if (error) {
      return renderError ? (
        renderError()
      ) : (
        <Container textAlign="center">
          <strong>Oh no!</strong>

          <Box mt={1} mb={3}>
            {error}
          </Box>

          <Button variant="primary" outline onClick={onReload}>
            Try Again
          </Button>
        </Container>
      );
    }

    return typeof children === 'function' ? children() : children;
  }
}
