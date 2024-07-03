'use client';

import { IoPencilSharp, IoTrashSharp } from 'react-icons/io5';

import MenuItem from './MenuItem';

import { storeDetailMenuList } from '@/constants';

export default function StoreDetailMenu() {
  const handleIconType = (type: string) => {
    if (type === 'edit') {
      return <IoPencilSharp />;
    }
    if (type === 'delete') {
      return <IoTrashSharp color="#FF5F5F" />;
    }
  };

  const handleMenuItem = (type: string) => {
    console.log(type);
    if (type === 'edit') {
      return;
    }
    if (type === 'delete') {
      return;
    }
  };

  return (
    <ul>
      {storeDetailMenuList.map((item) => (
        <div onClick={() => handleMenuItem(item.key)} key={item.key} className="border-b last:border-0 cursor-pointer">
          <MenuItem>
            <div className="p-2 mr-1">{handleIconType(item.key)}</div>
            <p className={item.key === 'delete' ? 'text-system-S200' : ''}>{item.name}</p>
          </MenuItem>
        </div>
      ))}
    </ul>
  );
}
