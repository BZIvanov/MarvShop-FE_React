import { useSelector } from '@/store/store';
import { selectUser } from '@/store/features/user/userSlice';
import { useGetProductsQuery } from '@/store/services/products';
import { useGetSellerOrdersQuery } from '@/store/services/orders';
import { useGetSellerOrdersStatsQuery } from '@/store/services/orders';
import { useGetChatsQuery } from '@/store/services/chat';

import SummarySection from './SummarySection';
import ChartSection from './ChartSection';
import ChatsSection from './ChatsSection';
import OrdersSection from './OrdersSection';

const SellerDashboard = () => {
  const user = useSelector(selectUser);

  const { data: ordersStatsData } = useGetSellerOrdersStatsQuery();
  const { data: productsData } = useGetProductsQuery(
    { sellerId: user?._id },
    { skip: !user?._id }
  );
  const { data: ordersData } = useGetSellerOrdersQuery({ page: 1, perPage: 3 });
  const { data: chatsData } = useGetChatsQuery({ perPageNumber: 3 });

  return (
    <div className='px-2 md:px-7 py-5'>
      <SummarySection
        totalSales={ordersStatsData?.totalPrice}
        productsCount={productsData?.totalCount}
        ordersCount={ordersData?.totalCount}
        pendingOrdersCount={ordersStatsData?.pendingOrders}
      />

      <div className='w-full flex flex-wrap mt-7'>
        <div className='w-full lg:w-7/12 lg:pr-3'>
          <ChartSection />
        </div>

        <div className='w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0'>
          <ChatsSection chats={chatsData?.chats} />
        </div>
      </div>

      <OrdersSection orders={ordersData?.orders} />
    </div>
  );
};

export default SellerDashboard;
