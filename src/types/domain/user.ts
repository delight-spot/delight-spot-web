type User = {
  pk: number;
  username: string;
  name: string;
  email: string;
  gender: 'male' | 'female';
  date_joined: Date;
  is_host: boolean;
};

export type { User };
