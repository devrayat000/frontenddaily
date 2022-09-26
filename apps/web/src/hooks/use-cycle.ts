import { useCallback, useState } from "react";

export default function useCycle<T>(
  initialState: T[],
  defaultState?: T | (() => T)
): [T, (newState?: React.SetStateAction<T>) => void] {
  const [state, setState] = useState(defaultState ?? initialState[0]);

  const cycle = useCallback(
    (newState?: React.SetStateAction<T>) => {
      setState(
        newState ??
          ((prev) => {
            const i = initialState.indexOf(prev);
            return i === initialState.length - 1
              ? initialState[0]
              : initialState[i + 1];
          })
      );
    },
    [initialState]
  );

  return [state, cycle];
}
