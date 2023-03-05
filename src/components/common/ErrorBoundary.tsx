import { GraphQLError } from "graphql";
import { useRouter } from "next/router";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CombinedError } from "urql";

import { UrqlErrorRetry } from "~/stores/urql-provider-extended";

export function formatGraphqlError(error: Error): string {
  if (error instanceof CombinedError) {
    if (error.networkError) {
      return "Could not fetch data due to network error!";
    }
    return error.message;
  }
  if (error instanceof GraphQLError) {
    return error.toString();
  }
  return error.message;
}

export const ClientErrorBoundary = ({ children }: React.PropsWithChildren) => {
  return (
    <UrqlErrorRetry>
      {({ retryFun }) => (
        <ErrorBoundary
          onReset={retryFun}
          onError={(error, { componentStack }) =>
            console.log({ error, componentStack })
          }
          fallbackRender={({ error, resetErrorBoundary }) => (
            <section className="flex flex-col items-center">
              <p className="text-lg text-red-500">
                {formatGraphqlError(error)}
              </p>
              <button
                type="button"
                className="text-lg text-red-500 px-4 py-2 rounded border border-red-500"
                onClick={resetErrorBoundary}
              >
                Try Again
              </button>
            </section>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </UrqlErrorRetry>
  );
};

export const RootErrorBoundary = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();

  return (
    <ErrorBoundary
      onReset={router.reload}
      onError={(error, { componentStack }) =>
        console.log({ error, componentStack })
      }
      fallbackRender={({ resetErrorBoundary }) => (
        <section className="flex flex-col items-center">
          <p className="text-xl text-red-500">Something went wrong!</p>
          <button
            type="button"
            className="text-lg text-red-500 px-4 py-2 rounded border border-red-500"
            onClick={resetErrorBoundary}
          >
            Reload Page
          </button>
        </section>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
