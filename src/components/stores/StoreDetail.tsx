'use client';

interface Props {
  id: number;
}

export default function StoreDetail({ id }: Props) {
  return <h1>{id}</h1>;
}
