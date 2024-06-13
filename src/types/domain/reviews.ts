interface Review {
  pk: number;
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  total_rating: number;
  taste_rating: number;
  atmosphere_rating: number;
  kindness_rating: number;
  clean_rating: number;
  parking_rating: number;
  restroom_rating: number;
  description: string;
}

export type { Review };
