'use client';

import Link from 'next/link';
import { useUser } from '@/hooks/useUser';

import MenuItem from './header/MenuItem';

import { filterHomeList } from '@/constants';

export default function HeaderMenu() {
  const { userInfo } = useUser();

  return (
    <ul>
      {filterHomeList(userInfo?.pk).map((item) => (
        <Link href={item.url} key={item.key} className="flex flex-col border-b last:border-0">
          <MenuItem>
            <p>{item.title}</p>
          </MenuItem>
        </Link>
      ))}
    </ul>
  );
}
