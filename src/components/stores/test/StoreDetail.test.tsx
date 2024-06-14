import { mockStoreDetail } from '@/tests/mockData/store';
import { useGetStoreDetail } from '@/hooks/queries/useGetStoreDetail';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import StoreDetailInfo from '../StoreDetailInfo';
import { TestQueryProvider } from '@/tests/TestQueryProvider';
import { StoreDetail } from '@/types/domain/stores';

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

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ 'data-testid': testId }: { 'data-testid': string }) => <div data-testid={testId}>Image</div>,
}));

jest.mock('../../../hooks/queries/useGetStoreDetail.tsx');

jest.mock('../../../components/IconWrapper.tsx', () => {
  const mockIconWrapper = ({ icon, 'data-testid': testId }: { icon: React.ReactNode; 'data-testid': string }) => (
    <div data-testid={testId}>{icon}</div>
  );
  return mockIconWrapper;
});

jest.mock('../../../components/RatingList.tsx', () => {
  const mockRatingList = ({
    ratingList,
  }: {
    ratingList?: {
      title: string;
      rating: number;
    }[];
  }) => (
    <ul>
      {ratingList?.map((item, index) => (
        <li key={index}>
          <span data-testid={`${item.title}-${index}`}>{item.title}</span>
          <span data-testid={`${item.rating}-${index}`}>{item.rating}</span>
        </li>
      ))}
    </ul>
  );

  return mockRatingList;
});

const mockUseGetStoreDetail = useGetStoreDetail as jest.Mock;

describe('StoreDetailInfo', () => {
  let mockStoreDetailData: StoreDetail;

  beforeEach(() => {
    mockStoreDetailData = { ...mockStoreDetail };
    mockUseGetStoreDetail.mockReturnValue({
      data: mockStoreDetailData,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('StoreDetailInfo UI 스냅샷', () => {
    const { container } = render(
      <TestQueryProvider>
        <StoreDetailInfo id={1} />
      </TestQueryProvider>
    );
    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="pt-20"
  >
    <div
      class="flex items-center gap-2 mb-4 px-4"
    >
      <div
        class="relative w-10 h-10 rounded-full"
      >
        <div
          data-testid="detail-avatar"
        >
          Image
        </div>
      </div>
      <div
        class="text-body leading-body flex w-full justify-between"
      >
        <div>
          <span
            class="text-black"
          >
            name
          </span>
          <div
            class="flex items-center gap-1 text-slate-S400"
          >
            <p>
              username
            </p>
            <span>
              ﹒
            </span>
            <p>
              방금 전
            </p>
          </div>
        </div>
        <div
          class="flex items-center gap-4"
        >
          <div
            data-testid="like-icon"
          >
            <svg
              color="#C8C9DF"
              fill="currentColor"
              height="18"
              stroke="currentColor"
              stroke-width="0"
              style="color: rgb(200, 201, 223);"
              viewBox="0 0 512 512"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m256 448-9-6c-42.78-28.57-96.91-60.86-137-108.32-42.25-50-62.52-101.35-62-157C48.63 114.54 98.46 64 159.08 64c48.11 0 80.1 28 96.92 48.21C272.82 92 304.81 64 352.92 64c60.62 0 110.45 50.54 111.08 112.65.56 55.68-19.71 107-62 157-40.09 47.49-94.22 79.78-137 108.35z"
              />
            </svg>
          </div>
          <div>
            <svg
              data-testid="share-icon"
              fill="currentColor"
              height="18"
              stroke="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="128"
                cy="256"
                fill="none"
                r="48"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
              <circle
                cx="384"
                cy="112"
                fill="none"
                r="48"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
              <circle
                cx="384"
                cy="400"
                fill="none"
                r="48"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
              <path
                d="m169.83 279.53 172.34 96.94m0-240.94-172.34 96.94"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full h-[22.5rem] bg-slate-400 relative"
    >
      <div
        data-testid="detail-photo"
      >
        Image
      </div>
    </div>
    <div
      class="border-b border-b-slate-S200 px-4 flex flex-col gap-5 pb-4"
    >
      <div
        class="flex items-center mt-4 gap-4"
      >
        <p
          class="text-h4 leading-h4 font-bold"
        >
          Store 1
        </p>
        <div
          class="flex items-center gap-0.5"
        >
          <svg
            color="#2D47DB"
            fill="currentColor"
            height="18"
            stroke="currentColor"
            stroke-width="0"
            style="color: rgb(45, 71, 219);"
            viewBox="0 0 512 512"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144zm0 224a64 64 0 1 1 64-64 64.07 64.07 0 0 1-64 64z"
            />
          </svg>
          <span
            class="text-body leading-label text-primary-P300 font-semibold"
          >
            Seoul
          </span>
        </div>
      </div>
      <div
        class="flex items-center gap-3"
      >
        <div
          class="flex items-center gap-1"
        >
          <svg
            color="#565978"
            fill="currentColor"
            height="1em"
            stroke="currentColor"
            stroke-width="0"
            style="color: rgb(86, 89, 120);"
            viewBox="0 0 512 512"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M416 174.74V48h-80v58.45L256 32 0 272h64v208h144V320h96v160h144V272h64l-96-97.26z"
            />
          </svg>
          <p
            class="text-system-S300 font-bold"
          >
            카페
          </p>
        </div>
        <div
          class="flex items-center gap-1"
        >
          <svg
            color="#565978"
            fill="currentColor"
            height="1em"
            stroke="currentColor"
            stroke-width="0"
            style="color: rgb(86, 89, 120);"
            viewBox="0 0 24 24"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0h24v24H0V0z"
              fill="none"
            />
            <circle
              cx="4.5"
              cy="9.5"
              r="2.5"
            />
            <circle
              cx="9"
              cy="5.5"
              r="2.5"
            />
            <circle
              cx="15"
              cy="5.5"
              r="2.5"
            />
            <circle
              cx="19.5"
              cy="9.5"
              r="2.5"
            />
            <path
              d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"
            />
          </svg>
          <p>
            애완동물
          </p>
          <span
            class="text-system-S300 font-bold"
          >
             가능
          </span>
        </div>
      </div>
      <div
        class="flex flex-col gap-0.5"
      >
        <p
          class="text-h4 leading-h4 font-bold"
        >
          설명
        </p>
        <p
          class="text-body leading-body"
        >
          A great store
        </p>
      </div>
      <div
        class="flex flex-col gap-2"
      >
        <p
          class="text-h4 leading-h4 font-bold"
        >
          평점 (
          4.5
          )
        </p>
        <ul>
          <li>
            <span
              data-testid="taste_rating-0"
            >
              taste_rating
            </span>
            <span
              data-testid="4-0"
            >
              4
            </span>
          </li>
          <li>
            <span
              data-testid="atmosphere_rating-1"
            >
              atmosphere_rating
            </span>
            <span
              data-testid="4-1"
            >
              4
            </span>
          </li>
          <li>
            <span
              data-testid="kindness_rating-2"
            >
              kindness_rating
            </span>
            <span
              data-testid="5-2"
            >
              5
            </span>
          </li>
          <li>
            <span
              data-testid="clean_rating-3"
            >
              clean_rating
            </span>
            <span
              data-testid="4.5-3"
            >
              4.5
            </span>
          </li>
          <li>
            <span
              data-testid="parking_rating-4"
            >
              parking_rating
            </span>
            <span
              data-testid="3.5-4"
            >
              3.5
            </span>
          </li>
          <li>
            <span
              data-testid="restroom_rating-5"
            >
              restroom_rating
            </span>
            <span
              data-testid="4-5"
            >
              4
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="my-4 px-4"
    >
      <p
        class="text-h4 leading-h4 font-bold"
      >
        댓글
      </p>
      <ul />
    </div>
  </div>
</div>
`);
  });

  it('스토어 아바타 있는 경우와 없는 경우', async () => {
    const { rerender, getByTestId } = render(
      <TestQueryProvider>
        <StoreDetailInfo id={1} />
      </TestQueryProvider>
    );

    await waitFor(() => {
      expect(getByTestId('detail-avatar')).toBeInTheDocument();
    });

    mockStoreDetailData!.owner.avatar = '';
    rerender(
      <TestQueryProvider>
        <StoreDetailInfo id={1} />
      </TestQueryProvider>
    );

    await waitFor(() => {
      const personIcon = screen.getByTestId('detail-person-icon');
      expect(personIcon).toBeInTheDocument();
    });
  });

  it('isLike이 true 경우 아이콘의 색상은 #FF5F5F, false 경우 #C8C9DF', async () => {
    mockStoreDetailData!.is_liked = true;
    const { rerender, getByTestId } = render(
      <TestQueryProvider>
        <StoreDetailInfo id={1} />
      </TestQueryProvider>
    );

    await waitFor(() => {
      const likeIcon = getByTestId('like-icon');
      expect(likeIcon.firstChild).toHaveAttribute('color', '#FF5F5F');
    });

    mockStoreDetailData!.is_liked = false;

    rerender(
      <TestQueryProvider>
        <StoreDetailInfo id={1} />
      </TestQueryProvider>
    );

    await waitFor(() => {
      const likeIcon = getByTestId('like-icon');
      expect(likeIcon.firstChild).toHaveAttribute('color', '#C8C9DF');
    });
  });

  it('스토어 photo가 있으면 사진, 없으면 빈 div태그', async () => {
    const { rerender, getByTestId } = render(
      <TestQueryProvider>
        <StoreDetailInfo id={1} />
      </TestQueryProvider>
    );

    await waitFor(() => {
      expect(getByTestId('detail-photo')).toBeInTheDocument();
    });

    mockStoreDetailData!.photos = [];
    rerender(
      <TestQueryProvider>
        <StoreDetailInfo id={1} />
      </TestQueryProvider>
    );

    await waitFor(() => {
      expect(getByTestId('detail-no-photo')).toBeInTheDocument();
    });
  });

  it('ratingList 포멧팅 데이터 & RatingList 컴포넌트 props로 전달하는지 테스팅', async () => {
    const calculateRatingList = (data: StoreDetail) => {
      return Object.keys(data)
        .filter((key) => key.endsWith('_rating') && key !== 'total_rating')
        .map((key) => ({
          title: key,
          rating: data[key as keyof StoreDetail] as number,
        }))
        .filter((item) => typeof item.rating === 'number');
    };

    let ratingList = calculateRatingList(mockStoreDetailData);

    const { rerender, getByTestId, queryByTestId } = render(
      <TestQueryProvider>
        <StoreDetailInfo id={1} />
      </TestQueryProvider>
    );

    await waitFor(() => {
      ratingList.forEach((item, index) => {
        expect(getByTestId(`${item.title}-${index}`)).toBeInTheDocument();
        expect(getByTestId(`${item.rating}-${index}`)).toBeInTheDocument();
      });
    });

    mockStoreDetailData.taste_rating = 'No Rating';
    ratingList = calculateRatingList(mockStoreDetailData);

    rerender(
      <TestQueryProvider>
        <StoreDetailInfo id={1} />
      </TestQueryProvider>
    );

    await waitFor(() => {
      ratingList.forEach((item, index) => {
        if (item.title === 'taste_rating') {
          // taste_rating 항목이 필터링되어 존재하지 않는지 확인
          expect(queryByTestId(`${item.title}-${index}`)).toBeNull();
          expect(queryByTestId(`${item.rating}-${index}`)).toBeNull();
        } else {
          // 다른 항목들은 여전히 존재하는지 확인
          expect(getByTestId(`${item.title}-${index}`)).toBeInTheDocument();
          expect(getByTestId(`${item.rating}-${index}`)).toBeInTheDocument();
        }
      });

      // 테스트 데이터가 제대로 변경되지 않았을 경우 대비한 추가 확인
      expect(mockStoreDetailData.taste_rating).toBe('No Rating');

      // ratingList가 올바르게 필터링되었는지 확인
      expect(ratingList.some((item) => item.title === 'taste_rating')).toBe(false);
    });
  });

  it('pet_friendly가 true일 경우, 가능, false라면 불가능', async () => {
    mockStoreDetailData.pet_friendly = true;
    const { rerender, getByText } = render(
      <TestQueryProvider>
        <StoreDetailInfo id={1} />
      </TestQueryProvider>
    );

    await waitFor(() => {
      expect(getByText('가능')).toBeInTheDocument();
    });

    mockStoreDetailData.pet_friendly = false;
    rerender(
      <TestQueryProvider>
        <StoreDetailInfo id={1} />
      </TestQueryProvider>
    );

    await waitFor(() => {
      expect(getByText('불가능')).toBeInTheDocument();
    });
  });

  it('총 평점(total_rating)이 있다면 total_rating 으로 보여주고,  No Ratings 값이라면 없음 텍스트 보여주기', async () => {
    const { rerender, getByText } = render(
      <TestQueryProvider>
        <StoreDetailInfo id={1} />
      </TestQueryProvider>
    );

    await waitFor(() => {
      expect(getByText(mockStoreDetailData.total_rating)).toBeInTheDocument();
    });

    mockStoreDetailData.total_rating = 'No Ratings';
    rerender(
      <TestQueryProvider>
        <StoreDetailInfo id={1} />
      </TestQueryProvider>
    );

    await waitFor(() => {
      expect(getByText('평점 (없음)')).toBeInTheDocument();
    });
  });
});
