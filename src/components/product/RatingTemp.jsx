import PropTypes from 'prop-types';

import { StarCIcon, StarFIcon } from '@/components/common/icons/Icons';

const RatingTemp = ({ rating }) => {
  if (rating === 5) {
    return (
      <>
        <span className='text-[#Edbb0E]'>
          <StarFIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarFIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarFIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarFIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarFIcon />
        </span>
      </>
    );
  } else if (rating === 4) {
    return (
      <>
        <span className='text-[#Edbb0E]'>
          <StarFIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarFIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarFIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarFIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarCIcon />
        </span>
      </>
    );
  } else if (rating === 3) {
    return (
      <>
        <span className='text-[#Edbb0E]'>
          <StarFIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarFIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarFIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarCIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarCIcon />
        </span>
      </>
    );
  } else if (rating === 2) {
    return (
      <>
        <span className='text-[#Edbb0E]'>
          <StarFIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarFIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarCIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarCIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarCIcon />
        </span>
      </>
    );
  } else if (rating === 1) {
    return (
      <>
        <span className='text-[#Edbb0E]'>
          <StarFIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarCIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarCIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarCIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarCIcon />
        </span>
      </>
    );
  } else {
    return (
      <>
        <span className='text-[#Edbb0E]'>
          <StarCIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarCIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarCIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarCIcon />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarCIcon />
        </span>
      </>
    );
  }
};

RatingTemp.propTypes = {
  rating: PropTypes.number,
};

export default RatingTemp;
