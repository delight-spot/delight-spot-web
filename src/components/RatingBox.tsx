import { translateRatingTitle } from '@/utils/translateToKorean';

interface Props {
  title: string;
  rating: number;
}

export default function RatingBox({ rating, title }: Props) {
  const ratingPercentage = Math.min(Math.max(rating, 0), 5) * 20;

  return (
    <div className="relative bg-slate-S200 h-10 w-full rounded-md">
      <div
        className="rounded-md absolute w-full h-full bg-system-S600 bg-opacity-50"
        style={{ width: `${ratingPercentage}%` }}
      />
      <p className="h-full flex items-center px-2 text-body leading-body font-semibold relative z-10">
        {`${translateRatingTitle(title)} (${rating})`}
      </p>
    </div>
  );
}
