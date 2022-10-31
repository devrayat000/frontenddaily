import { createContext, useContext, useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import type { AnyVariables, UseQueryArgs } from "urql";
import { useQuery as useUrqlQuery } from "urql";

export function useQuery<
  Data = any,
  Variables extends AnyVariables = AnyVariables
>(args: UseQueryArgs<Variables, Data>) {
  const results = useUrqlQuery(args);
  const errorHandler = useErrorHandler();
  const { subscribeToRetry } = useContext(ErrorRetryContext);

  if (results[0].error) {
    errorHandler(results[0].error);
  }
  subscribeToRetry(() => results[1]());

  return results;
}

function createRetry() {
  let retry = () => {};
  return {
    retryFun: retry,
    subscribeToRetry(retryFn: () => void) {
      retry = retryFn;
    },
  };
}

const ErrorRetryContext = createContext(createRetry());

type UrqlErrorRetryValue = ReturnType<typeof createRetry>;

export interface UrqlErrorRetryProps {
  children: ((value: UrqlErrorRetryValue) => React.ReactNode) | React.ReactNode;
}

export function UrqlErrorRetry({ children }: UrqlErrorRetryProps) {
  const [retryState] = useState(createRetry);

  return (
    <ErrorRetryContext.Provider value={retryState}>
      {typeof children === "function"
        ? (children as Function)(retryState)
        : children}
    </ErrorRetryContext.Provider>
  );
}
