import EventEmitter from 'mitt';
import { Events } from './config';

export const emitter = new (EventEmitter as any)();

const toast = (options: any = {}) => {
  if (!options.message) {
    throw new Error('Molekule: Toast requires a message');
  }

  emitter.emit(Events.ADD, options);
};

toast.success = (message: string, options = {}) => {
  toast({ message, type: 'success', ...options });
};

toast.error = (message: string, options = {}) => {
  toast({ message, type: 'error', ...options });
};

toast.warn = (message: string, options = {}) => {
  toast({ message, type: 'warn', ...options });
};

toast.info = (message: string, options = {}) => {
  toast({ message, type: 'info', ...options });
};

export default toast;
