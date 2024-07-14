import render from '@/utils/test/render';
import AlertModal from '../modal/AlertModal';
import { screen } from '@testing-library/dom';

const routerReplaceFn = jest.fn();
const closeFn = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      replace: routerReplaceFn,
    };
  },
}));

it('isOpen가 true라면 렌더링된다.', async () => {
  await render(<AlertModal isOpen close={closeFn} type="error" />);
  expect(screen.getByLabelText('alert-modal')).toBeInTheDocument();
});

it('title을 지정하면 노출된다.', async () => {
  await render(<AlertModal isOpen close={closeFn} type="error" title="test-modal-title" />);

  expect(screen.getByText('test-modal-title'));
});

it('title이 없다면 "서비스 장애가 발생하였습니다."를 노출한다', async () => {
  await render(<AlertModal isOpen close={closeFn} type="error" />);
  expect(screen.getByText('서비스 장애가 발생하였습니다.'));
});

it('description이 있다면 description을 노출한다,', async () => {
  await render(<AlertModal isOpen close={closeFn} type="error" description="test-modal-description" />);
  expect(screen.getByText('test-modal-description'));
});

it('지정한 backUrl이 있다면 url로 이동한다.', async () => {
  const { user } = await render(<AlertModal isOpen close={closeFn} type="error" backUrl="/test" />);

  const closeButton = screen.getByRole('button');
  await user.click(closeButton);

  expect(routerReplaceFn).toHaveBeenCalledWith('/test');
});

it('지정한 backUrl이 있다면 url로 이동한다.', async () => {
  const { user } = await render(<AlertModal isOpen close={closeFn} type="error" backUrl="/test" />);

  const closeButton = screen.getByRole('button');
  await user.click(closeButton);

  expect(routerReplaceFn).toHaveBeenCalledWith('/test');
});

it('type을 confirm으로 지정하면 confirm icon이 노출된다.', async () => {
  await render(<AlertModal isOpen close={closeFn} type="confirm" />);
  expect(screen.getByLabelText('confirm-icon')).toBeInTheDocument();
});
it('type을 warning으로 지정하면 warning icon이 노출된다.', async () => {
  await render(<AlertModal isOpen close={closeFn} type="warning" />);
  expect(screen.getByLabelText('warning-icon')).toBeInTheDocument();
});
it('type을 error으로 지정하면 error icon이 노출된다.', async () => {
  await render(<AlertModal isOpen close={closeFn} type="error" />);
  expect(screen.getByLabelText('error-icon')).toBeInTheDocument();
});
