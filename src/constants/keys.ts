const queryKeys = {
  USER: {
    INFO: 'userInfo',
  },
  STORE: {
    GET_STORES: 'GetStores',
    GET_STORE_DETAIL: 'GetStoreDetail',
    GET_REVIEWS: 'GetReviews',
  },
} as const;

const ACCESS_TOKEN = 'access_token';

export { queryKeys, ACCESS_TOKEN };
