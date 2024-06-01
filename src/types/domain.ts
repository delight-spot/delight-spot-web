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
  total_rating: boolean;
  is_owner: boolean;
  user_name: string;
  is_liked: boolean;
  photos: Photo[];
  create_at: Date;
}

export type { Photo, SellingList, Store, KindMenu };
