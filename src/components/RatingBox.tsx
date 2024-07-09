import { RatingTitle } from '@/types/domain/stores';
import { translateRatingTitle } from '@/utils/translateToKorean';
import { FaStar } from 'react-icons/fa';

interface Props {
  title: RatingTitle;
  rating: number;
}

const MAX_COUNT = 5;
export default function RatingBox({ rating, title }: Props) {
  return (
    <div>
      <div className="flex items-center gap-5">
        <p className="min-w-24 text-body leading-body">{`${translateRatingTitle(title)} (${rating})`}</p>
        <div className="flex items-center gap-3">
          {Array.from({ length: MAX_COUNT }).map((_, index) => (
            <div key={index}>
              <FaStar size={20} color={index < rating ? '#FFBD53' : '#C8C9DF'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
