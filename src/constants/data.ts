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

const storeTabList = [
  {
    title: '전체',
    key: 'all',
  },
  {
    title: '음식',
    key: 'food',
  },
  {
    title: '카페',
    key: 'cafe',
  },
] as const;

const storeTypeList = [
  {
    name: '카페',
    key: 'cafe',
  },
  {
    name: '음식',
    key: 'food',
  },
  {
    name: '기타',
    key: 'ect',
  },
];

export { sideModalList, storeTabList, storeTypeList };
