import { useGetOrdersStatsQuery } from '@/store/services/orders';
import SummarySection from './SummarySection';

const BuyerDashboard = () => {
  const { data } = useGetOrdersStatsQuery();

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <SummarySection
        totalOrders={data?.totalOrders}
        pendingOrders={data?.pendingOrders}
        canceledOrders={data?.canceledOrders}
      />
    </div>
  );
};

export default BuyerDashboard;
