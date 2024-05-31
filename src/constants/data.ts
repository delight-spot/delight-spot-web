import { paths } from './paths';

const sideModalList = [
  {
    title: '찜 스토어',
    key: 'booking',
    url: paths.BOOKING_STORE,
  },
  {
    title: '공유 스토어',
    key: 'share',
    url: paths.SHARE_STORE,
  },
  {
    title: '마이페이지',
    key: 'myPage',
    url: paths.MY_PAGE,
  },
  {
    title: '공지사항',
    key: 'notice',
    url: paths.NOTICE,
  },
] as const;

export { sideModalList };
