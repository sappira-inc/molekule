import React from 'react';
import Button from '../Button';
import Box from '../Box';
import Collapse from './Collapse';

export default {
  title: 'Components|Collapse',
  description:
    'Collapse is used to show and hide content. Use a button, anchor, or other clickable element as triggers',
  component: Collapse,
};

export const Basic = () => {
  class Example extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false,
      };
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }

    render() {
      return (
        <React.Fragment>
          <Button onClick={() => this.toggle()}>Toggle</Button>

          <Collapse isOpen={this.state.isOpen}>
            <Box p={3} mt={3} style={{ background: 'gainsboro' }}>
              I'm in a collapsible element!
            </Box>
          </Collapse>
        </React.Fragment>
      );
    }
  }

  return <Example />;
};

export const CustomTrigger = () => (
  <>
    <Collapse renderTrigger={({ toggle }) => <Button onClick={toggle}>Click the custom trigger</Button>}>
      <Box p={3} mt={3} style={{ background: 'gainsboro' }}>
        I'm in a collapsible element!
      </Box>
    </Collapse>
  </>
);
