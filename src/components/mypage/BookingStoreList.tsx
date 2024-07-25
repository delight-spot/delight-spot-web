'use client';

import { useGetBookingList } from '@/hooks/queries/useBookings';
import { IoImage, IoTrash } from 'react-icons/io5';

import ImageSlider from '../stores/ImageSlider';
import ListMoveButton from './ListMoveButton';
import { useEffect, useRef, useState } from 'react';

export default function BookingStoreList() {
  const { data } = useGetBookingList();
  const [showBackButton, setShowBackButton] = useState(false);
  const [showForwardButton, setShowForwardButton] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  const firstItemRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (data && data.pages.flat().length > 3) {
      setShowForwardButton(true);
    }

    const handleScroll = () => {
      if (listRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
        setShowBackButton(scrollLeft > 0);
        setShowForwardButton(scrollLeft < scrollWidth - clientWidth);
      }
    };

    const ulElement = listRef.current;
    if (ulElement) {
      ulElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ulElement) {
        ulElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [data]);

  const handleForwardClick = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  const handleBackClick = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full  group">
      {showBackButton && <ListMoveButton direction="left" onClick={handleBackClick} />}
      <ul ref={listRef} className="flex items-center gap-4 overflow-x-auto pb-3 relative ">
        {data?.pages.flat().map((item, index) => (
          <li ref={index === 0 ? firstItemRef : null} key={item.pk} className="relative flex-none flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-black">{item.name}</p>
              <button className="text-system-S200 hover:text-system-S100 transition-colors p-1">
                <IoTrash />
              </button>
            </div>
            <div className="w-[10rem] h-[10rem]  relative">
              {item?.photos && item.photos.length > 0 ? (
                <ImageSlider images={item.photos} />
              ) : (
                <div
                  className="absolute w-full h-full bg-slate-200 flex items-center justify-center"
                  data-testid="detail-no-photo"
                >
                  <IoImage size={30} color="#64748b" />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      {showForwardButton && <ListMoveButton direction="right" onClick={handleForwardClick} />}
    </div>
  );
}
