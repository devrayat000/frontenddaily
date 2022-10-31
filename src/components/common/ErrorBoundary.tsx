import { Button, Stack, Text } from "@mantine/core";
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
            <Stack align="center">
              <Text size="lg" color="red">
                {formatGraphqlError(error)}
              </Text>
              <Button
                variant="outline"
                color="red"
                onClick={resetErrorBoundary}
              >
                Try Again
              </Button>
            </Stack>
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
        <Stack align="center">
          <Text size="xl" color="red">
            Something went wrong!
          </Text>
          <Button
            variant="outline"
            color="red"
            size="lg"
            onClick={resetErrorBoundary}
          >
            Reload Page
          </Button>
        </Stack>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
