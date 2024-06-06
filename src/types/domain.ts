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
  total_rating: number;
  taste_rating: number;
  atmosphere_rating: number;
  kindness_rating: number;
  clean_rating: number;
  parking_rating: number;
  restroom_rating: number;
  is_owner: boolean;
  photos: Photo[];
  is_liked: false;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: number;
  kind_menu: KindMenu;
  pet_friendly: boolean;
  city: string;
}

export type { Photo, SellingList, Store, KindMenu, StoreDetail };
