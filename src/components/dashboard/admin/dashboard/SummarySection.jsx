import PropTypes from 'prop-types';
import { Banknote, ShoppingBasket, Users, FileCheck } from 'lucide-react';

import SummaryCard from '@/components/dashboard/common/cards/SummaryCard';
import { currencyFormatter } from '@/utils/formatting';

const SummarySection = ({
  totalSales,
  productsCount,
  sellersCount,
  ordersCount,
}) => {
  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7'>
      <SummaryCard
        value={currencyFormatter(totalSales)}
        title='Total Sales'
        icon={<Banknote className='text-[#fae8e8] shadow-lg' />}
        cardClassName='bg-[#fae8e8]'
        iconClassName='bg-[#fa0305]'
      />

      <SummaryCard
        value={productsCount}
        title='Products'
        icon={<ShoppingBasket className='text-[#fae8e8] shadow-lg' />}
        cardClassName='bg-[#fde2ff]'
        iconClassName='bg-[#760077]'
      />

      <SummaryCard
        value={sellersCount}
        title='Sellers'
        icon={<Users className='text-[#fae8e8] shadow-lg' />}
        cardClassName='bg-[#e9feea]'
        iconClassName='bg-[#038000]'
      />

      <SummaryCard
        value={ordersCount}
        title='Orders'
        icon={<FileCheck className='text-[#fae8e8] shadow-lg' />}
        cardClassName='bg-[#ecebff]'
        iconClassName='bg-[#0200f8]'
      />
    </div>
  );
};

SummarySection.propTypes = {
  totalSales: PropTypes.number,
  productsCount: PropTypes.number,
  sellersCount: PropTypes.number,
  ordersCount: PropTypes.number,
};

export default SummarySection;
