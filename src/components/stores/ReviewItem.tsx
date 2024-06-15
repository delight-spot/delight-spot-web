import { Review } from '@/types/domain/reviews';
import Avatar from './Avatar';

interface Props {
  review: Review;
}

export default function ReviewItem({ review }: Props) {
  return (
    <li className="mt-10 first:mt-0 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Avatar size={32} avatarUrl={review.user.avatar} />
        <div className="flex flex-col text-body-s">
          <p className="text-black">{review?.user.name}</p>
          <p className="text-slate-S400">{review?.user.username}</p>
        </div>
      </div>

      <div className="pl-10">
        <p>{review.description}</p>
      </div>
    </li>
  );
}
