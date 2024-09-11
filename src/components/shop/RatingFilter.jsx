import { AiFillStar } from 'react-icons/ai';
import { CiStar } from 'react-icons/ci';

import { useDispatch } from '../../store/store';
import { changeFilter } from '../../store/features/productsFilters/productsFiltersSlice';

const RatingFilter = () => {
  const dispatch = useDispatch();

  const renderStars = (fullStars) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < fullStars ? <AiFillStar key={i} /> : <CiStar key={i} />);
    }
    return stars;
  };

  return (
    <div className='py-3 flex flex-col gap-4'>
      <h2 className='text-3xl font-bold mb-3 text-slate-600'>Rating</h2>
      <div className='flex flex-col gap-3'>
        {[5, 4, 3, 2, 1, 0].map((ratingValue) => (
          <div
            key={ratingValue}
            onClick={() =>
              dispatch(
                changeFilter({ rating: ratingValue !== 0 ? ratingValue : null })
              )
            }
            className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'
          >
            {renderStars(ratingValue)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
