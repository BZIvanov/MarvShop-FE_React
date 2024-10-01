import PropTypes from 'prop-types';

import { StarC, StarF } from '@/components/common/icons/Icons';

const RatingTemp = ({ rating }) => {
  if (rating === 5) {
    return (
      <>
        <span className='text-[#Edbb0E]'>
          <StarF />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarF />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarF />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarF />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarF />
        </span>
      </>
    );
  } else if (rating === 4) {
    return (
      <>
        <span className='text-[#Edbb0E]'>
          <StarF />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarF />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarF />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarF />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarC />
        </span>
      </>
    );
  } else if (rating === 3) {
    return (
      <>
        <span className='text-[#Edbb0E]'>
          <StarF />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarF />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarF />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarC />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarC />
        </span>
      </>
    );
  } else if (rating === 2) {
    return (
      <>
        <span className='text-[#Edbb0E]'>
          <StarF />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarF />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarC />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarC />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarC />
        </span>
      </>
    );
  } else if (rating === 1) {
    return (
      <>
        <span className='text-[#Edbb0E]'>
          <StarF />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarC />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarC />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarC />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarC />
        </span>
      </>
    );
  } else {
    return (
      <>
        <span className='text-[#Edbb0E]'>
          <StarC />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarC />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarC />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarC />
        </span>
        <span className='text-[#Edbb0E]'>
          <StarC />
        </span>
      </>
    );
  }
};

RatingTemp.propTypes = {
  rating: PropTypes.number,
};

export default RatingTemp;
