import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetOrdersQuery } from '@/store/services/orders';
import Pagination from '@/components/common/Pagination';
import Search from '@/components/common/Search';
import { currencyFormatter } from '@/utils/formatting';

const BuyerOrders = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState('');

  const { data } = useGetOrdersQuery({
    page,
    perPage,
    deliveryStatus: selectedDeliveryStatus,
  });
  const orders = data?.orders || [];

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[#000000] font-semibold text-lg my-3'>Orders</h1>

      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        {/* redesign the page selection to be next to the pagination? */}
        <Search
          perPage={perPage}
          setPerPage={setPerPage}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <div className='mt-3'>
          <select
            name='deliveryStatus'
            value={selectedDeliveryStatus}
            onChange={(event) => setSelectedDeliveryStatus(event.target.value)}
            className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
          >
            <option value=''>All</option>
            <option value='pending'>Pending</option>
            <option value='completed'>Completed</option>
            <option value='canceled'>Canceled</option>
          </select>
        </div>

        <div className='relative overflow-x-auto mt-5'>
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
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    {order._id}
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    {currencyFormatter(order.totalPrice)}
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    {order.deliveryStatus}
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    {order.paymentStatus}
                  </td>
                  <td
                    scope='row'
                    className='py-1 px-4 font-medium whitespace-nowrap'
                  >
                    <div className='flex justify-start items-center gap-4'>
                      <Link to={`/buyer/orders/${order._id}`}>
                        <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded'>
                          View
                        </span>
                      </Link>
                      {order.paymentStatus === 'Pending' && (
                        <Link to={`/payment/${order._id}`}>
                          <span className='bg-green-200 text-green-800 text-md font-semibold mr-2 px-3 py-[2px] rounded'>
                            Pay Now
                          </span>
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data?.totalCount > perPage && (
          <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
            <Pagination
              pageNumber={page}
              setPageNumber={setPage}
              totalItem={data.totalCount}
              perPage={perPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerOrders;
