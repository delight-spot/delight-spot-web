import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import Header from './Header';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';

const mockPush = jest.fn();
const mockBack = jest.fn();
const mockShow = jest.fn();
const mockHide = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}));

jest.mock('../../hooks/useModal.tsx', () => ({
  useModal: () => ({
    show: mockShow,
    hide: mockHide,
    isVisible: false,
  }),
}));

describe('Header', () => {
  it('Header 스냅샷', () => {
    const { container } = render(<Header title="test title" />);
    expect(container).toMatchInlineSnapshot(`
<div>
  <header
    class="relative w-full"
  >
    <div
      class="py-4 px-1 flex items-center relative justify-between"
    >
      <div />
      <h1
        class="absolute left-1/2 transform -translate-x-1/2 text-h4 font-bold text-slate-S900"
      >
        test title
      </h1>
    </div>
  </header>
</div>
`);
  });

  it('뒤로가기 - isBack이 있고, backUrl이 있을 경우 onBackPage', () => {
    const router = useRouter();
    const backUrl = '/prev';
    const { getByRole } = render(<Header title="test" isBack backUrl={backUrl} />);
    fireEvent.click(getByRole('button'));
    expect(router.push).toHaveBeenCalledWith(backUrl);
  });

  it('뒤로가기 - isBack이 있고, backUrl이 없을 경우 onBackPage', () => {
    const router = useRouter();
    const { getByRole } = render(<Header title="test" isBack />);
    fireEvent.click(getByRole('button'));
    expect(router.back).toHaveBeenCalledWith();
  });

  it('아이콘 타입 - share', () => {
    render(<Header title="test title" rightType="share" />);
  });

  it('오른쪽 아이콘 타입 - 공유하기', () => {
    render(<Header title="test title" rightType="share" />);
    const rightIconButton = screen.getByRole('button');
    fireEvent.click(rightIconButton);
  });

  it('오른쪽 아이콘 타입 - 메뉴', () => {
    const { result } = renderHook(() => useModal());
    render(<Header title="test title" rightType="menu" />);
    const rightIconButton = screen.getByRole('button');
    fireEvent.click(rightIconButton);
    expect(result.current.show).toHaveBeenCalled();
  });
});
