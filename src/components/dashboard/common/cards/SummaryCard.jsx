import PropTypes from 'prop-types';

import { cn } from '@/lib/utils';

const SummaryCard = ({ value, title, icon, cardClassName, iconClassName }) => {
  return (
    <div
      className={cn(
        'flex justify-between items-center p-5 rounded-md gap-3',
        cardClassName
      )}
    >
      <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
        <h2 className='text-3xl font-bold'>{value}</h2>
        <span className='text-md font-medium'>{title}</span>
      </div>

      <div
        className={cn(
          'w-[40px] h-[47px] rounded-full flex justify-center items-center text-xl',
          iconClassName
        )}
      >
        {icon}
      </div>
    </div>
  );
};

SummaryCard.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  icon: PropTypes.node,
  cardClassName: PropTypes.string,
  iconClassName: PropTypes.string,
};

export default SummaryCard;
