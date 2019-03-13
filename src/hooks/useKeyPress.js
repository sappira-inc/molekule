import { useEffect } from 'react';

export default function useKeyPress(targetKeys, callback, keyEvents = ['keydown']) {
  const keys = Array.isArray(targetKeys) ? targetKeys : [targetKeys];

  const pressHandler = ({ key }) => {
    if (keys.indexOf(key) >= 0) {
      callback();
    }
  };

  useEffect(() => {
    keyEvents.forEach(keyEvent => {
      window.addEventListener(keyEvent, pressHandler);
    });

    return () => {
      keyEvents.forEach(keyEvent => {
        window.removeEventListener(keyEvent, pressHandler);
      });
    };
  }, [targetKeys, callback, keyEvents]);
}
