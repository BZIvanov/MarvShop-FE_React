import PropTypes from 'prop-types';
import { ShoppingBasket } from 'lucide-react';

import SummaryCard from '@/components/dashboard/common/cards/SummaryCard';

const SummarySection = ({ totalOrders, pendingOrders, canceledOrders }) => {
  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7'>
      <SummaryCard
        value={totalOrders}
        title='All Orders'
        icon={<ShoppingBasket className='text-[#fae8e8] shadow-lg' />}
        cardClassName='bg-[#fae8e8]'
        iconClassName='bg-[#fa0305]'
      />

      <SummaryCard
        value={pendingOrders}
        title='Pending Orders'
        icon={<ShoppingBasket className='text-[#fae8e8] shadow-lg' />}
        cardClassName='bg-[#fde2ff]'
        iconClassName='bg-[#760077]'
      />

      <SummaryCard
        value={canceledOrders}
        title='Canceled Orders'
        icon={<ShoppingBasket className='text-[#fae8e8] shadow-lg' />}
        cardClassName='bg-[#e9feea]'
        iconClassName='bg-[#038000]'
      />
    </div>
  );
};

SummarySection.propTypes = {
  totalOrders: PropTypes.number,
  pendingOrders: PropTypes.number,
  canceledOrders: PropTypes.number,
};

export default SummarySection;
