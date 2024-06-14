import { Store, StoreDetail } from '@/types/domain/stores';

const mockStores: Store[] = [
  {
    pk: 1,
    name: 'Store 1',
    description: 'A great store',
    kind_menu: 'cafe',
    sell_list: [{ pk: 1, name: 'Coffee', description: 'Hot coffee' }],
    city: 'Seoul',
    reviews_len: 10,
    total_rating: 4.5,
    is_owner: false,
    user_name: 'user1',
    is_liked: true,
    photos: [{ pk: 1, file: 'url-to-photo', description: 'Store front' }],
    create_at: new Date(),
  },
  // 다른 mock store 데이터 추가 가능
];

const mockStoreDetail: StoreDetail = {
  id: 1,
  owner: { name: 'Owner 1', avatar: 'url-to-avatar', username: 'owner1' },
  sell_list: [{ pk: 1, name: 'Coffee', description: 'Hot coffee' }],
  total_rating: 4.5,
  taste_rating: 4.0,
  atmosphere_rating: 4.0,
  kindness_rating: 5.0,
  clean_rating: 4.5,
  parking_rating: 3.5,
  restroom_rating: 4.0,
  is_owner: true,
  photos: [{ pk: 1, file: 'url-to-photo', description: 'Store front' }],
  is_liked: false,
  created_at: new Date(),
  updated_at: new Date(),
  name: 'Store 1',
  description: 'A great store',
  kind_menu: 'cafe',
  pet_friendly: true,
  city: 'Seoul',
};

export { mockStores, mockStoreDetail };
