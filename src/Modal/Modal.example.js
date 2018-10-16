import React from 'react';
import Modal from './Modal';
import Button from '../Button';
import Box from '../Box';

export default class ModalDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModelOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  toggle() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  onCancel() {
    this.toggle();
    setTimeout(() => {
      alert('Oh no! It has been canceled.');
    }, 500);
  }

  onConfirm() {
    this.toggle();

    setTimeout(() => {
      alert('Yahoo! It has been confirmed.');
    }, 500);
  }

  render() {
    const { body, ...props } = this.props;

    return (
      <div>
        <Button onClick={this.toggle}>Open Modal</Button>

        <Modal open={this.state.isModalOpen} onClose={this.toggle} title="Example Modal" {...props}>
          <Modal.Body>{body}</Modal.Body>

          <Modal.Footer>
            <Box align="right">
              <Button.Group>
                <Button variant="gray" onClick={this.onCancel}>
                  Cancel
                </Button>
                <Button variant="success" onClick={this.onConfirm}>
                  Okay
                </Button>
              </Button.Group>
            </Box>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
