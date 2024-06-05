import { useGetInfiniteStores } from '@/hooks/queries/useGetStores';
import { getStores } from '@/services/store/store';
import { TestQueryProvider } from '@/tests/TestQueryProvider';
import { render, renderHook, screen, waitFor, act } from '@testing-library/react';
import StoreList from '../StoreList';
import { Store } from '@/types/domain';

jest.mock('../../../services/store/store.ts', () => ({
  getStores: jest.fn(),
}));

jest.mock('../../stores/StoreItem.tsx', () => {
  const MockStoreItem = ({ store }: { store: Store }) => <h1>{store.name}</h1>;
  MockStoreItem.displayName = 'MockStoreItem';
  return MockStoreItem;
});

beforeAll(() => {
  global.IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })) as unknown as typeof IntersectionObserver;
});

describe('Store List', () => {
  it('useGetInfiniteStores가 데이터를 성공적으로 패치하는지', async () => {
    (getStores as jest.Mock).mockImplementation(() => [
      { pk: 1, name: 'Store 1' },
      { pk: 2, name: 'Store 2' },
    ]);
    const { result } = renderHook(() => useGetInfiniteStores(), { wrapper: TestQueryProvider });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    render(
      <TestQueryProvider>
        <StoreList />
      </TestQueryProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Store 1')).toBeInTheDocument();
      expect(screen.getByText('Store 2')).toBeInTheDocument();
    });
  });
});
