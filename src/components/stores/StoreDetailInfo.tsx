'use client';

import { useGetStoreDetail } from '@/hooks/queries/useGetStoreDetail';
import { useUser } from '@/hooks/useUser';
import { useModal } from '@/hooks/useModal';
import { useRouter } from 'next/navigation';

import IconWrapper from '../IconWrapper';
import RatingList from '../RatingList';
import Avatar from './Avatar';
import ReviewList from './review/ReviewList';
import Header from '../header/Header';
import StoreDetailSubtitle from './StoreDetailSubTitle';
import LoginModal from '../modal/LoginModal';
import ImageSlider from './ImageSlider';

import { StoreDetail } from '@/types/domain/stores';
import { translateKindMenu } from '@/utils/translateToKorean';
import { formatTimeAgo } from '@/utils/formatDate';
import { cls } from '@/utils/cls';
import { MdOutlinePets } from 'react-icons/md';
import { IoLocationSharp, IoHeartSharp, IoShareSocialOutline, IoHomeSharp, IoPencilSharp } from 'react-icons/io5';

interface Props {
  id: number;
}

export default function StoreDetailInfo({ id }: Props) {
  const { data } = useGetStoreDetail(id);
  const router = useRouter();
  const modal = useModal();
  const { isLoggedIn } = useUser();

  const ratingList: { title: string; rating: number }[] = data
    ? Object.keys(data)
        .filter((key): key is keyof StoreDetail => key.endsWith('_rating') && key !== 'total_rating')
        .map((key) => ({
          title: key,
          rating: data[key as keyof StoreDetail] as number,
        }))
        .filter((item) => typeof item.rating === 'number')
    : [];

  const onBooking = () => {
    if (!isLoggedIn) return modal.show();
    console.log('booking');
  };

  const onShare = () => {
    if (!isLoggedIn) return modal.show();
    console.log('share');
  };

  const onReviewForm = () => {
    if (!isLoggedIn) return modal.show();
    router.push(`/store/${id}/review`);
  };

  return (
    <div>
      <Header title={data?.name ?? ''} rightType="menu" isBack />
      <div className="pt-20 min-w-sm md:w-md m-auto">
        <div className="flex items-center gap-2 mb-4 px-4">
          <Avatar size={40} avatarUrl={data?.owner.avatar} />

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
              <IconWrapper
                onClick={onBooking}
                icon={<IoHeartSharp size={18} color={data?.is_liked ? '#FF5F5F' : '#C8C9DF'} />}
                data-testid="like-icon"
              />
              <IconWrapper onClick={onShare} icon={<IoShareSocialOutline size={18} data-testid="share-icon" />} />
            </div>
          </div>
        </div>

        <div className="w-full h-[22.5rem] md:min-h-[48rem] bg-slate-400 relative">
          {data?.photos && data?.photos.length > 0 ? (
            <ImageSlider images={data.photos.map((photo) => photo.file)} />
          ) : (
            <div className="absolute w-full h-full" data-testid="detail-no-photo" />
          )}
        </div>

        <div className="border-b border-b-slate-S200 px-4 flex flex-col gap-5 pb-4">
          <div className="flex items-center mt-4 gap-4">
            <StoreDetailSubtitle title={data?.name ?? ''} />

            <div className="flex items-center gap-0.5">
              <IoLocationSharp size={18} color="#2D47DB" />
              <span className="text-label leading-label text-primary-P300 font-semibold max-w-[200px] ">
                {data?.city}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <IoHomeSharp color="#565978" />
              <p className="text-system-S300 font-bold">{translateKindMenu(data?.kind_menu)}</p>
            </div>
            <div className="flex items-center gap-1">
              <MdOutlinePets color="#565978" />
              <p>애완동물</p>
              <span className={cls(data?.pet_friendly ? 'text-system-S300' : 'text-system-S200', 'font-bold')}>
                {data?.pet_friendly ? ' 가능' : '불가능'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <StoreDetailSubtitle title="설명" />
            <p className="text-body leading-body">{data?.description}</p>
          </div>

          <div className="flex flex-col gap-2">
            <StoreDetailSubtitle
              title={`평점 (${data?.total_rating === 'No Ratings' ? '없음' : data?.total_rating})`}
            />
            <RatingList ratingList={ratingList} />
          </div>
        </div>

        <div className="my-4 px-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <StoreDetailSubtitle title="리뷰" />
            <button onClick={onReviewForm} className="flex items-center gap-1 p-2">
              <IoPencilSharp color="#2D47DB" />
              <span className="text-subtitle leading-subtitle text-primary-P300 ">리뷰 쓰기</span>
            </button>
          </div>
          <ReviewList storeId={id} />
        </div>
      </div>

      <LoginModal isOpen={modal.isVisible} onCloseModal={modal.hide} />
    </div>
  );
}
