import { RatingTitle } from '@/types/domain/stores';
import { paths } from './paths';

const homeMenuList = [
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

const storeTypeList = ['cafe', 'food', 'ect'] as const;

const petFriendlyOptions = ['possible', 'impossible'] as const;

const storeDetailMenuList = [
  {
    name: '수정',
    key: 'edit',
  },
  {
    name: '삭제',
    key: 'delete',
  },
];

const storeRatingList: RatingTitle[] = [
  'taste_rating',
  'atmosphere_rating',
  'kindness_rating',
  'clean_rating',
  'parking_rating',
  'restroom_rating',
] as const;

export { homeMenuList, storeTabList, storeTypeList, storeDetailMenuList, storeRatingList, petFriendlyOptions };
