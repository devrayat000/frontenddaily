import { createContext, useContext, useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import useSWRQuery from "swr";

export function useSWR<Data = any, Variables extends object = any>(
  args: [string] | [string, Variables]
) {
  const results = useSWRQuery<Data, any, [string] | [string, Variables]>(args);
  const errorHandler = useErrorHandler();
  const { subscribeToRetry } = useContext(ErrorRetryContext);

  if (results.error) {
    errorHandler(results.error);
  }
  subscribeToRetry(() => results.mutate(undefined, { revalidate: true }));

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

type SWRErrorRetryValue = ReturnType<typeof createRetry>;

export interface SWRErrorRetryProps {
  children: ((value: SWRErrorRetryValue) => React.ReactNode) | React.ReactNode;
}

export function SWRErrorRetry({ children }: SWRErrorRetryProps) {
  const [retryState] = useState(createRetry);

  return (
    <ErrorRetryContext.Provider value={retryState}>
      {typeof children === "function"
        ? (children as Function)(retryState)
        : children}
    </ErrorRetryContext.Provider>
  );
}
