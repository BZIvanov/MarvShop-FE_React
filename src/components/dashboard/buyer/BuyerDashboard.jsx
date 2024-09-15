import { FaCartShopping } from 'react-icons/fa6';

import { useGetOrdersStatsQuery } from '../../../store/services/orders';

const BuyerDashboard = () => {
  const { data } = useGetOrdersStatsQuery();

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7'>
        <div className='flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>{data?.totalOrders}</h2>
            <span className='text-md font-medium'>Orders</span>
          </div>

          <div className='w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl'>
            <FaCartShopping className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>

        <div className='flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>{data?.pendingOrders}</h2>
            <span className='text-md font-medium'>Pending Orders</span>
          </div>

          <div className='w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl'>
            <FaCartShopping className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>

        <div className='flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>{data?.canceledOrders}</h2>
            <span className='text-md font-medium'>Cancelled Orders</span>
          </div>

          <div className='w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl'>
            <FaCartShopping className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
