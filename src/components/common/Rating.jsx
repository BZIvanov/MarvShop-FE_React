import PropTypes from 'prop-types';

import { StarC, StarF, StarHalfIcon } from '@/components/common/icons/Icons';

const Rating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const value = i + 1;

    if (rating >= value) {
      return (
        <span key={i} className='text-[#EDBB0E]'>
          <StarF />
        </span>
      );
    } else if (rating >= value - 0.5) {
      return (
        <span key={i} className='text-[#EDBB0E]'>
          <StarHalfIcon />
        </span>
      );
    } else {
      return (
        <span key={i} className='text-slate-600'>
          <StarC />
        </span>
      );
    }
  });

  return <>{stars}</>;
};

Rating.propTypes = {
  rating: PropTypes.number,
};

export default Rating;
