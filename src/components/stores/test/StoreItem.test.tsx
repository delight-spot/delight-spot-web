import { render, screen } from '@testing-library/react';
import StoreItem from '../StoreItem';
import { Store } from '@/types/domain';

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => <div>Image</div>,
}));

const fakeNotImageStore = {
  name: '테스트 스토어',
  photos: [],
  city: '서울',
  kind_menu: '한식',
  reviews_len: 0,
  is_liked: false,
  description: '테스트 설명',
} as unknown as Store;

const fakeHasImageStore = {
  ...fakeNotImageStore,
  photos: [{ file: 'http://store.jpg' }],
} as unknown as Store;

const fakeReviewStore = {
  ...fakeNotImageStore,
  reviews_len: 10,
} as unknown as Store;

const fakeLikeStore = {
  ...fakeNotImageStore,
  is_liked: true,
} as unknown as Store;

describe('StoreItem', () => {
  it('StoreItem UI 스냅샷 ', () => {
    const { container } = render(<StoreItem store={fakeNotImageStore} />);
    expect(container).toMatchInlineSnapshot(`
<div>
  <li
    class="flex gap-2"
  >
    <div
      class="relative w-[8rem] h-[8rem] rounded-md overflow-hidden "
    >
      <div
        class="absolute w-full h-full bg-slate-S200 flex items-center justify-center"
      >
        <svg
          color="#64748b"
          data-testid="store-no-image-icon"
          fill="currentColor"
          height="20"
          stroke="currentColor"
          stroke-width="0"
          style="color: rgb(100, 116, 139);"
          viewBox="0 0 512 512"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M416 64H96a64.07 64.07 0 0 0-64 64v256a64.07 64.07 0 0 0 64 64h320a64.07 64.07 0 0 0 64-64V128a64.07 64.07 0 0 0-64-64zm-80 64a48 48 0 1 1-48 48 48.05 48.05 0 0 1 48-48zM96 416a32 32 0 0 1-32-32v-67.63l94.84-84.3a48.06 48.06 0 0 1 65.8 1.9l64.95 64.81L172.37 416zm352-32a32 32 0 0 1-32 32H217.63l121.42-121.42a47.72 47.72 0 0 1 61.64-.16L448 333.84z"
          />
        </svg>
      </div>
    </div>
    <div
      class="flex flex-col flex-1 justify-between"
    >
      <div>
        <p
          class="line-clamp-2 text-subtitle leading-subtitle font-semibold"
        >
          테스트 스토어
        </p>
        <div
          class="flex flex-col mt-2 *:text-label *:leading-label *:text-slate-S500"
        >
          <span
            class="font-semibold text-slate-S700"
          >
            서울
          </span>
          <span
            class="uppercase my-1"
          >
            한식
          </span>
          <div
            class="flex items-center gap-2"
          >
            <div
              class="flex items-center"
            >
              <svg
                color="#C8C9DF"
                data-testid="store-star-icon"
                fill="currentColor"
                height="12"
                stroke="currentColor"
                stroke-width="0"
                style="color: rgb(200, 201, 223);"
                viewBox="0 0 512 512"
                width="12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M394 480a16 16 0 0 1-9.39-3L256 383.76 127.39 477a16 16 0 0 1-24.55-18.08L153 310.35 23 221.2a16 16 0 0 1 9-29.2h160.38l48.4-148.95a16 16 0 0 1 30.44 0l48.4 149H480a16 16 0 0 1 9.05 29.2L359 310.35l50.13 148.53A16 16 0 0 1 394 480z"
                />
              </svg>
              <span>
                (0)
              </span>
            </div>
            <div>
              <svg
                color="#C8C9DF"
                data-testid="store-heart-icon"
                fill="currentColor"
                height="12"
                stroke="currentColor"
                stroke-width="0"
                style="color: rgb(200, 201, 223);"
                viewBox="0 0 512 512"
                width="12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m256 448-9-6c-42.78-28.57-96.91-60.86-137-108.32-42.25-50-62.52-101.35-62-157C48.63 114.54 98.46 64 159.08 64c48.11 0 80.1 28 96.92 48.21C272.82 92 304.81 64 352.92 64c60.62 0 110.45 50.54 111.08 112.65.56 55.68-19.71 107-62 157-40.09 47.49-94.22 79.78-137 108.35z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p
        class="line-clamp-2 font-semibold text-label text-slate-S400"
      >
        테스트 설명
      </p>
    </div>
  </li>
</div>
`);
  });

  it('store에 사진이 없을 경우 대체 이미지를 보여줌', () => {
    render(<StoreItem store={fakeNotImageStore} />);
    const icon = screen.getByTestId('store-no-image-icon');
    expect(icon).toBeInTheDocument();
  });

  it('store에 사진이 있을 경우', () => {
    render(<StoreItem store={fakeHasImageStore} />);
    expect(screen.getByText('Image'));
  });

  it('reviews_len이 0일 경우 별 아이콘 색상이 #C8C9DF인지 확인', () => {
    render(<StoreItem store={fakeNotImageStore} />);
    const starIcon = screen.getByTestId('store-star-icon');
    expect(starIcon).toHaveStyle('color :#C8C9DF');
  });

  it('review_len가 있을 경우', () => {
    render(<StoreItem store={fakeReviewStore} />);
    const starIcon = screen.getByTestId('store-star-icon');
    expect(starIcon).toHaveStyle('color :#FFBD53');
  });

  it('is_like false 경우', () => {
    render(<StoreItem store={fakeNotImageStore} />);
    const heartIcon = screen.getByTestId('store-heart-icon');
    expect(heartIcon).toHaveStyle('color :#C8C9DF');
  });

  it('is_like true 일 경우', () => {
    render(<StoreItem store={fakeLikeStore} />);
    const heartIcon = screen.getByTestId('store-heart-icon');
    expect(heartIcon).toHaveStyle('color :#FF5F5F');
  });
});
