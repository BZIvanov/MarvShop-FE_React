import { Link } from 'react-router-dom';
import Chart from 'react-apexcharts';

import { useSelector } from '@/store/store';
import { selectUser } from '@/store/features/user/userSlice';
import { useGetProductsQuery } from '@/store/services/products';
import { useGetSellerOrdersQuery } from '@/store/services/orders';
import { useGetSellerOrdersStatsQuery } from '@/store/services/orders';
import { useGetChatsQuery } from '@/store/services/chat';
import {
  CurrencyExchangeIcon,
  ProductionQuantityLimitsIcon,
  CartShoppingIcon,
} from '@/components/common/icons/Icons';
import { currencyFormatter, dateFormatter } from '@/utils/formatting';

const state = {
  series: [
    {
      name: 'Orders',
      data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 34, 45],
    },
    {
      name: 'Revenue',
      data: [67, 39, 45, 56, 90, 56, 23, 56, 87, 78, 67, 78],
    },
    {
      name: 'Sales',
      data: [34, 39, 56, 56, 80, 67, 23, 56, 98, 78, 45, 56],
    },
  ],
  options: {
    color: ['#181ee8', '#181ee8'],
    plotOptions: {
      radius: 30,
    },
    chart: {
      background: 'transparent',
      foreColor: '#d0d2d6',
    },
    dataLabels: {
      enabled: false,
    },
    strock: {
      show: true,
      curve: ['smooth', 'straight', 'stepline'],
      lineCap: 'butt',
      colors: '#f0f0f0',
      width: 0.5,
      dashArray: 0,
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    legend: {
      position: 'top',
    },
    responsive: [
      {
        breakpoint: 565,
        yaxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        },
        options: {
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          chart: {
            height: '550px',
          },
        },
      },
    ],
  },
};

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
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7'>
        <div className='flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>
              {currencyFormatter(ordersStatsData?.totalPrice)}
            </h2>
            <span className='text-md font-medium'>Total Salse</span>
          </div>

          <div className='w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl'>
            <CurrencyExchangeIcon className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>

        <div className='flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>{productsData?.totalCount}</h2>
            <span className='text-md font-medium'>Products</span>
          </div>

          <div className='w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl'>
            <ProductionQuantityLimitsIcon className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>

        <div className='flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>{ordersData?.totalCount}</h2>
            <span className='text-md font-medium'>Orders</span>
          </div>

          <div className='w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl'>
            <CartShoppingIcon className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>

        <div className='flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>
              {ordersStatsData?.pendingOrders}
            </h2>
            <span className='text-md font-medium'>Pending Orders</span>
          </div>

          <div className='w-[40px] h-[47px] rounded-full bg-[#0200f8] flex justify-center items-center text-xl'>
            <CartShoppingIcon className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>
      </div>

      <div className='w-full flex flex-wrap mt-7'>
        <div className='w-full lg:w-7/12 lg:pr-3'>
          <div className='w-full bg-[#6a5fdf] p-4 rounded-md'>
            <Chart
              options={state.options}
              series={state.series}
              type='bar'
              height={350}
            />
          </div>
        </div>

        <div className='w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0'>
          <div className='w-full bg-[#6a5fdf] p-4 rounded-md text-[#d0d2d6]'>
            <div className='flex justify-between items-center'>
              <h2 className='font-semibold text-lg text-[#d0d2d6] pb-3'>
                Recent Customer Message
              </h2>
              <Link
                to='/seller/chat'
                className='font-semibold text-sm text-[#d0d2d6]'
              >
                View All
              </Link>
            </div>

            <div className='flex flex-col gap-2 pt-6 text-[#d0d2d6]'>
              <ul className='relative border-1 border-slate-600 ml-4'>
                {chatsData?.chats.map((chat) => {
                  const receiver = chat.participants.find(
                    (participant) => participant.user._id !== user._id
                  );

                  return (
                    <li key={chat._id} className='mb-3 ml-6'>
                      <div className='flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10'>
                        <img
                          className='w-full rounded-full h-full shadow-lg'
                          src={
                            receiver.user?.avatar?.imageUrl ||
                            '/images/avatar.png'
                          }
                          alt='User avatar'
                        />
                      </div>
                      <div className='p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm'>
                        <div className='flex justify-between items-center mb-2'>
                          <Link
                            to={`/seller/chat/${receiver.user._id}`}
                            className='text-md font-normal'
                          >
                            {receiver.user.username}
                          </Link>
                          <time className='mb-1 text-sm font-normal sm:order-last sm:mb-0'>
                            {chat.updatedAt
                              ? dateFormatter(chat.updatedAt)
                              : ''}
                          </time>
                        </div>
                        <div className='p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800'>
                          {chat.mostRecentMessage}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full p-4 bg-[#6a5fdf] rounded-md mt-6'>
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-lg text-[#d0d2d6] pb-3 '>
            Recent Orders
          </h2>
          <Link
            to='/seller/orders'
            className='font-semibold text-sm text-[#d0d2d6]'
          >
            View All
          </Link>
        </div>

        <div className='relative overflow-x-auto'>
          <table className='w-full text-sm text-left text-[#d0d2d6]'>
            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
              <tr>
                <th scope='col' className='py-3 px-4'>
                  Order ID
                </th>
                <th scope='col' className='py-3 px-4'>
                  Price
                </th>
                <th scope='col' className='py-3 px-4'>
                  Delivery Status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Payment Status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {ordersData?.orders.map((order) => (
                <tr key={order._id}>
                  <td
                    scope='row'
                    className='py-3 px-4 font-medium whitespace-nowrap'
                  >
                    {order._id}
                  </td>
                  <td
                    scope='row'
                    className='py-3 px-4 font-medium whitespace-nowrap'
                  >
                    {currencyFormatter(order.totalPrice)}
                  </td>
                  <td
                    scope='row'
                    className='py-3 px-4 font-medium whitespace-nowrap'
                  >
                    {order.deliveryStatus}
                  </td>
                  <td
                    scope='row'
                    className='py-3 px-4 font-medium whitespace-nowrap'
                  >
                    {order.paymentStatus}
                  </td>
                  <td
                    scope='row'
                    className='py-3 px-4 font-medium whitespace-nowrap'
                  >
                    <Link to={`/seller/orders/${order._id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
