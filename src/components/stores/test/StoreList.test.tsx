import { useGetInfiniteStores } from '@/hooks/queries/useGetStores';
import { getStores } from '@/services/store/store';
import { TestQueryProvider } from '@/tests/TestQueryProvider';
import { act, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import StoreList from '../StoreList';
import { Store } from '@/types/domain';

import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { storeTabList } from '@/constants';

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

  it('아이템 클릭할 경우 디테일 페이지로 이동', async () => {
    (getStores as jest.Mock).mockImplementation(() => [
      { pk: 1, name: 'Store 1' },
      { pk: 2, name: 'Store 2' },
    ]);

    render(
      <TestQueryProvider>
        <StoreList />
      </TestQueryProvider>,
      { wrapper: MemoryRouterProvider }
    );

    await waitFor(() => {
      expect(screen.getByText('Store 1')).toBeInTheDocument();
    });

    const link = await screen.findByRole('link', { name: 'Store 1' });
    fireEvent.click(link);

    expect(mockRouter.asPath).toEqual('/store/1');
  });

  it('Store tab 클릭 했을 때 탭 하이라이트 되는지 검증', () => {
    render(
      <TestQueryProvider>
        <StoreList />
      </TestQueryProvider>
    );

    storeTabList.forEach((tab) => {
      const tabElement = screen.getByText(tab.title);
      fireEvent.click(tabElement);

      const selectedBar = screen.getByTestId('selected');
      expect(selectedBar).toBeInTheDocument();
      expect(selectedBar.parentElement).toHaveTextContent(tab.title);
    });
  });
});
