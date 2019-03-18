import { useCallback, useEffect } from 'react';

export default function useKeyPress(targetKeys, callback, keyEvent = 'keydown') {
  const keys = Array.isArray(targetKeys) ? targetKeys : [targetKeys];

  const pressHandler = useCallback(
    event => {
      if (keys.indexOf(event.key) >= 0) {
        callback(event);
      }
    },
    [targetKeys, callback]
  );

  useEffect(() => {
    window.addEventListener(keyEvent, pressHandler);
    return () => window.removeEventListener(keyEvent, pressHandler);
  }, [targetKeys, callback, keyEvent]);
}
