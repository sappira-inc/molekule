import { useCallback, useEffect } from 'react';

export const useKeyPress = (
  targetKeys: string | string[],
  callback: (event: KeyboardEvent) => void,
  keyEvent = 'keydown'
) => {
  const pressHandler = useCallback(
    (event: KeyboardEvent) => {
      const keys = Array.isArray(targetKeys) ? targetKeys : [targetKeys];

      if (keys.indexOf(event.key) >= 0) {
        callback(event);
      }
    },
    [targetKeys, callback]
  );

  useEffect(() => {
    window.addEventListener(keyEvent, pressHandler);
    return () => window.removeEventListener(keyEvent, pressHandler);
  }, [pressHandler, keyEvent]);
};
