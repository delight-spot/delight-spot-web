import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

export function TestQueryProvider({ children }: PropsWithChildren) {
  const testClient = createTestQueryClient();
  return <QueryClientProvider client={testClient}>{children}</QueryClientProvider>;
}
