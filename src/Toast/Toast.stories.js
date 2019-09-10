import React from 'react';
import ToastContainer from './ToastContainer';
import toast from './toast';
import Button from '../Button';

export default {
  title: 'Components|Toast',
  component: ToastContainer,
};

export const Basic = () => (
  <>
    <h4>Variants</h4>
    <Button.Group>
      <Button
        variant="success"
        onClick={() => {
          toast.success('Yay!');
        }}>
        Success
      </Button>

      <Button
        variant="danger"
        onClick={() => {
          toast.error('Danger!');
        }}>
        Danger
      </Button>

      <Button
        variant="warning"
        onClick={() => {
          toast.warn('Warning!');
        }}>
        Warning
      </Button>

      <Button
        variant="info"
        onClick={() => {
          toast.info('This is some serious info!');
        }}>
        Info
      </Button>
    </Button.Group>

    <h4>Positioning</h4>
    <Button.Group>
      <Button
        variant="success"
        onClick={() => {
          toast.success('Yay!', {
            position: 'bottom-left',
          });
        }}>
        Show a toast on the bottom left
      </Button>

      <Button
        variant="danger"
        onClick={() => {
          toast.error('Danger!', {
            position: 'top-right',
          });
        }}>
        Show a toast on the top right
      </Button>
    </Button.Group>

    <ToastContainer />
  </>
);
