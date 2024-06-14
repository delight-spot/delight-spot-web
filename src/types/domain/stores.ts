type Photo = {
  pk: number;
  file: string;
  description: string;
};

type SellingList = {
  pk: number;
  name: string;
  description: string;
};

type KindMenu = 'cafe' | 'food' | 'ect';

interface Store {
  pk: number;
  name: string;
  description: string;
  kind_menu: KindMenu;
  sell_list: SellingList[];
  city: string;
  reviews_len: number;
  total_rating: number | string;
  is_owner: boolean;
  user_name: string;
  is_liked: boolean;
  photos: Photo[];
  create_at: Date;
}

interface StoreDetail {
  id: number;
  owner: {
    name: string;
    avatar: string;
    username: string;
  };
  sell_list: SellingList[];
  total_rating: number | string;
  taste_rating: number | string;
  atmosphere_rating: number | string;
  kindness_rating: number | string;
  clean_rating: number | string;
  parking_rating: number | string;
  restroom_rating: number | string;
  is_owner: boolean;
  photos: Photo[];
  is_liked: boolean;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  kind_menu: KindMenu;
  pet_friendly: boolean;
  city: string;
}

export type { Photo, SellingList, Store, KindMenu, StoreDetail };
