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
  reviews_len: string;
  kind_menu: KindMenu;
  kind_detail: string;
  sell_list: SellingList[];
  city: string;
  rating: string;
  is_owner: boolean;
  user_name: string;
  is_liked: boolean;
  photos: Photo[];
}

export type { Photo, SellingList, Store, KindMenu };
