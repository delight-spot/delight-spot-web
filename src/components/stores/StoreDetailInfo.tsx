'use client';

import { useGetStoreDetail } from '@/hooks/queries/useGetStoreDetail';
import Image from 'next/image';
import { IoLocationSharp, IoHeartSharp, IoShareSocialOutline, IoPerson, IoHomeSharp } from 'react-icons/io5';
import { MdOutlinePets } from 'react-icons/md';
import IconWrapper from '../IconWrapper';
import { formatTimeAgo } from '@/utils/formatDate';
import { cls } from '@/utils/cls';
import { translateKindMenu } from '@/utils/translateToKorean';
import RatingList from '../RatingList';
import { StoreDetail } from '@/types/domain';

interface Props {
  id: number;
}

export default function StoreDetailInfo({ id }: Props) {
  const { data } = useGetStoreDetail(id);

  const ratingList: { title: string; rating: number }[] = data
    ? Object.keys(data)
        .filter((key): key is keyof StoreDetail => key.endsWith('_rating') && key !== 'total_rating')
        .map((key) => ({
          title: key,
          rating: data[key as keyof StoreDetail] as number,
        }))
        .filter((item) => typeof item.rating === 'number')
    : [];

  return (
    <div className="pt-20">
      <div className="flex items-center gap-2 mb-4 px-4">
        <div className="relative w-10 h-10 rounded-full">
          {data?.owner.avatar ? (
            <Image src={data.owner.avatar} alt={data.owner.name} className="rounded-full overflow-hidden" />
          ) : (
            <div className="absolute w-full h-full rounded-full overflow-hidden bg-[#64748b] flex items-center justify-center">
              <IoPerson size={18} color="white" />
            </div>
          )}
        </div>

        <div className="text-body leading-body flex w-full justify-between">
          <div>
            <span className="text-black">{data?.owner.name}</span>
            <div className="flex items-center gap-1 text-slate-S400">
              <p>{data?.owner.username}</p>
              <span>﹒</span>
              <p>{formatTimeAgo(data?.created_at)}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <IconWrapper icon={<IoHeartSharp size={18} color={data?.is_liked ? '#FF5F5F' : '#C8C9DF'} />} />
            <IconWrapper icon={<IoShareSocialOutline size={18} />} />
          </div>
        </div>
      </div>

      <div className="w-full h-[22.5rem] bg-slate-400 relative">
        {data?.photos && data?.photos.length > 0 ? (
          <Image src={data.photos[0].file} alt={data.name} fill />
        ) : (
          <div className="absolute w-full h-full" />
        )}
      </div>

      <div className="border-b border-b-slate-S200 px-4 flex flex-col gap-4 pb-4">
        <p className="text-h4 leading-h4 font-bold mt-4">{data?.name}</p>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <IoHomeSharp color="#565978" />
            <p className="text-system-S300 font-bold">{translateKindMenu(data?.kind_menu)}</p>
          </div>
          <div className="flex items-center gap-1">
            <MdOutlinePets color="#565978" />
            <p>애완동물 동반입장</p>
            <span className={cls(data?.pet_friendly ? 'text-system-S300' : 'text-system-S200', 'font-bold')}>
              {data?.pet_friendly ? ' 가능' : '불가능'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <IoLocationSharp size={18} color="#2D47DB" />
          <span className="text-body leading-label text-primary-P300 font-semibold">{data?.city}</span>
        </div>

        <div className="flex flex-col gap-0.5">
          <p className="text-h4 leading-h4 font-bold">설명</p>
          <p className="text-body leading-body">{data?.description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-h4 leading-h4 font-bold">
            평점 ({data?.total_rating === 'No Ratings' ? '없음' : data?.total_rating})
          </p>
          <RatingList ratingList={ratingList} />
        </div>
      </div>

      <div className="my-4 px-4">
        <p className="text-h4 leading-h4 font-bold">댓글</p>
      </div>
    </div>
  );
}
