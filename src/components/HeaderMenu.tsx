'use client';

import Link from 'next/link';

import MenuItem from './header/MenuItem';

import { mainHeaderMenu } from '@/constants';

export default function HeaderMenu() {
  return (
    <ul>
      {mainHeaderMenu.map((item) => (
        <Link href={item.url} key={item.key} className="flex flex-col border-b last:border-0">
          <MenuItem>
            <p>{item.title}</p>
          </MenuItem>
        </Link>
      ))}
    </ul>
  );
}
