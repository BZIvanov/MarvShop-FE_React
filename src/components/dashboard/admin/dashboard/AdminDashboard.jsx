import { useGetOrdersStatsQuery } from '@/store/services/orders';
import { useGetProductsQuery } from '@/store/services/products';
import { useGetShopsQuery } from '@/store/services/shops';
import { useGetOrdersQuery } from '@/store/services/orders';
import { useGetChatsQuery } from '@/store/services/chat';
import SummarySection from './SummarySection';
import ChartSection from './ChartSection';
import ChatsSection from './ChatsSection';
import OrdersSection from './OrdersSection';

const AdminDashboard = () => {
  const { data: ordersStatsData } = useGetOrdersStatsQuery();
  const { data: productsData } = useGetProductsQuery({ page: 1, perPage: 1 });
  const { data: shopsData } = useGetShopsQuery({ page: 1, perPage: 1 });
  const { data: ordersData } = useGetOrdersQuery({ page: 1, perPage: 3 });
  const { data: chatsData } = useGetChatsQuery({ perPageNumber: 3 });

  return (
    <div className='px-2 md:px-7 py-5'>
      <SummarySection
        totalSales={ordersStatsData?.totalPrice}
        productsCount={productsData?.totalCount}
        shopsCount={shopsData?.totalCount}
        ordersCount={ordersData?.totalCount}
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

export default AdminDashboard;
