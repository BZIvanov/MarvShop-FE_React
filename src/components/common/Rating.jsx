import PropTypes from 'prop-types';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';

const Rating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const value = i + 1;

    if (rating >= value) {
      return (
        <span key={i} className='text-[#EDBB0E]'>
          <FaStar />
        </span>
      );
    } else if (rating >= value - 0.5) {
      return (
        <span key={i} className='text-[#EDBB0E]'>
          <FaStarHalfAlt />
        </span>
      );
    } else {
      return (
        <span key={i} className='text-slate-600'>
          <CiStar />
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
