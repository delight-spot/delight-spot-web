import axios from 'axios';
import { getStoreDetail, getStores } from '../store';
import { mockStoreDetail, mockStores } from '@/tests/mockData/store';

jest.mock('axios', () => {
  const mockAxiosInstance = {
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  };
  return {
    create: jest.fn(() => mockAxiosInstance),
  };
});

const mockApi = axios.create() as jest.Mocked<typeof axios>;

describe('API Test', () => {
  it('getStore 함수가 올바른 데이터를 반환하는지 테스트', async () => {
    mockApi.get.mockResolvedValueOnce({ data: mockStores });

    const result = await getStores(1, 'cafe');
    expect(result).toEqual(mockStores);
    expect(mockApi.get).toHaveBeenCalledWith('/stores', {
      params: {
        page: 1,
        type: 'cafe',
      },
    });
  });

  it('getStoreDetail 함수가 올바르게 데이터를 반환하는지 테스트', async () => {
    mockApi.get.mockResolvedValueOnce({ data: mockStoreDetail });

    const result = await getStoreDetail(1);
    expect(result).toEqual(mockStoreDetail);
    expect(mockApi.get).toHaveBeenCalledWith('/stores/1');
  });
});
